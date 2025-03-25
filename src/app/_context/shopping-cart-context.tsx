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

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartType = Awaited<ReturnType<typeof API.cart.getCart>> | undefined;

type ShoppingCartContext = {
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cart: CartType;
  isLoading: boolean;
  isSubmitting: boolean;
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

  const cartQuantity = cart?.items.reduce((quantity, item) => {
    return quantity + item.quantity;
  }, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartQuantity: cartQuantity ?? 0,
        isLoading: isLoading || !isInitialised,
        isSubmitting: deleteCartItem.isPending || updateItemQuantity.isPending,
        cart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
