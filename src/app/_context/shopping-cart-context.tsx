"use client";

import { api } from "~/trpc/react";
import { type api as API } from "~/trpc/server";
import { useLocalStorage } from "../_hooks/use-local-storage";
import {
  type ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { createPriceString } from "../_lib/utils";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartType = Awaited<ReturnType<typeof API.cart.getCart>> | undefined;

type ShoppingCartContext = {
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  subtotalPrice: number;
  subtotalPriceString: string;
  currency: string;
  cart: CartType;
  isLoading: boolean;
  isSubmitting: boolean;
  clearCart: () => void;
  applyCouponCode: (code: string) => void;
  removeCouponCode: (code: string) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const { userId } = useAuth();
  const { sessionId, deleteSessionId } = useLocalStorage();
  const [isInitialised, setIsInitialised] = useState(false);

  const utils = api.useUtils();
  const deleteCartItem = api.cart.deleteCartItem.useMutation({
    onSuccess: async () => {
      await utils.cart.getCart.invalidate();
    },
  });
  const updateItemQuantity = api.cart.updateCartItemQuantity.useMutation({
    onSuccess: async () => {
      await utils.cart.getCart.invalidate();
    },
  });
  const deleteCartItems = api.cart.clearCart.useMutation({
    onSuccess: async () => {
      await utils.cart.getCart.invalidate();
    },
  });

  const {
    data: cart,
    isLoading,
    refetch,
  } = api.cart.getCart.useQuery(
    { cartSessionId: sessionId ?? null },
    {
      enabled: sessionId !== undefined,
      refetchOnWindowFocus: true,
    },
  );

  useEffect(() => {
    if (sessionId !== undefined && !isInitialised) {
      setIsInitialised(true);
      if (sessionId && userId) {
        deleteSessionId();
      }
    }
  }, [sessionId, isInitialised, userId, deleteSessionId, refetch]);

  useEffect(() => {
    if (!userId && sessionId) {
      void refetch();
    }
  }, [refetch, sessionId, userId]);

  function increaseItemQuantity(id: number) {
    const item = cart?.items.find((item) => item.id === id);
    if (item) {
      updateItemQuantity.mutate({
        cartItemId: id,
        quantity: item.quantity + 1,
        cartSessionId: !userId ? (sessionId ?? null) : null,
      });
    }
  }

  function decreaseItemQuantity(id: number) {
    const item = cart?.items.find((item) => item.id === id);
    if (item) {
      updateItemQuantity.mutate({
        cartItemId: id,
        quantity: item.quantity - 1,
        cartSessionId: sessionId ?? null,
      });
    }
  }

  function removeFromCart(id: number) {
    deleteCartItem.mutate({
      cartItemId: id,
      cartSessionId: sessionId ?? null,
    });
  }

  function applyCouponCode(code: string) {
    // Implement coupon code logic here
    // This is just a placeholder function
    console.log(`Applying coupon code: ${code}`);
  }

  function removeCouponCode(code: string) {
    // Implement coupon code removal logic here
    // This is just a placeholder function
    console.log(`Removing coupon code: ${code}`);
  }

  function clearCart() {
    deleteCartItems.mutate({
      cartSessionId: sessionId ?? null,
    });
  }

  const cartQuantity = cart?.items.reduce((quantity, item) => {
    return quantity + item.quantity;
  }, 0);

  const subtotalPrice =
    cart?.items.reduce((total, item) => {
      const itemPrice = item.variant
        ? item.variant.price * item.quantity
        : item.product.price * item.quantity;
      return total + itemPrice;
    }, 0) ?? 0;

  const subtotalPriceString = cart?.items[0]
    ? createPriceString(subtotalPrice, cart?.items[0].product.currency)
    : "";

  const currency = cart?.items[0]?.product.currency ?? "";

  return (
    <ShoppingCartContext.Provider
      value={{
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartQuantity: cartQuantity ?? 0,
        subtotalPrice,
        subtotalPriceString,
        currency,
        isLoading: isLoading || !isInitialised,
        isSubmitting: deleteCartItem.isPending || updateItemQuantity.isPending,
        cart,
        clearCart,
        applyCouponCode,
        removeCouponCode,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
