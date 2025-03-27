"use client";

import { Check, Pencil, ShoppingCart, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/_components/ui/sheet";
import { useShoppingCart } from "../_context/shopping-cart-context";
import { Separator } from "./ui/separator";
import LoadingSpinner, { LoadingSpinnerSmall } from "./loading-spinner";
import { Button } from "./ui/button";
import { createPriceString } from "../_lib/utils";
import Link from "next/link";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ShoppingCartMenu() {
  const {
    cartQuantity,
    cart,
    isLoading,
    removeFromCart,
    isSubmitting,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useShoppingCart();
  const [editItem, setEditItem] = useState<number | null>();

  const cartTotal = cart?.items.reduce((total, item) => {
    const itemPrice = item.variant?.price ?? item.product.price;
    const itemQuantity = item.quantity;
    return total + itemPrice * itemQuantity;
  }, 0);

  const cartCurrency =
    cart?.items[0]?.variant?.currency ?? cart?.items[0]?.product?.currency;

  function handleEditItem(id: number) {
    setEditItem((prev) => (prev === id ? null : id));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingCart />

          {cartQuantity > 0 && (
            <span className="absolute -top-3 left-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-primary bg-primary text-xs text-secondary">
              {cartQuantity}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="overflow-hidden bg-highlight-2 px-2 md:px-4">
        <SheetHeader>
          <SheetTitle className="text-center text-xl font-extralight text-highlight-1">
            Shopping Cart
          </SheetTitle>
          <VisuallyHidden>
            <SheetDescription>Your shopping cart</SheetDescription>
          </VisuallyHidden>
          <Separator className="bg-highlight-1" />
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <LoadingSpinner />
            </div>
          )}

          {cart && (
            <>
              {cart.items.length > 0 ? (
                <>
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row gap-8 transition-all duration-500 data-[state-open=true]:-translate-x-[calc(100%+16px)]"
                      data-state-open={editItem === item.id}
                    >
                      <div
                        key={item.id}
                        className="flex w-full items-center justify-between"
                      >
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="flex w-full items-center gap-2 md:gap-4"
                        >
                          <picture>
                            <img
                              src={item.product.ProductImages[0]?.imageUrl}
                              alt={item.product.name}
                              className="aspect-square w-14 object-cover md:w-20"
                            />
                          </picture>
                          <div>
                            <h3 className="text-sm font-semibold">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {item.variant?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {createPriceString(
                                item.variant?.price ?? item.product.price,
                                item.variant?.currency ?? item.product.currency,
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </Link>
                        <button
                          onClick={() => handleEditItem(item.id)}
                          className="flex h-full w-12 items-center justify-center hover:text-muted-foreground"
                        >
                          <Pencil size={16} />
                        </button>
                      </div>

                      <div
                        className="absolute left-[calc(100%+1rem)] flex h-full w-full flex-row items-center justify-between data-[state-open=false]:translate-x-[calc(100%+16px)]"
                        data-state-open={editItem === item.id}
                      >
                        <div className="w-12">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            disabled={isSubmitting}
                            className="flex size-12 items-center justify-center rounded-md border-2 border-destructive transition hover:bg-destructive/30"
                          >
                            {isSubmitting ? (
                              <LoadingSpinnerSmall variant="destructive" />
                            ) : (
                              <Trash size={24} className="text-destructive" />
                            )}
                          </button>
                        </div>

                        <div className="flex w-full items-center justify-center gap-2">
                          <Button
                            onClick={() => decreaseItemQuantity(item.id)}
                            variant={"ghost"}
                            className="h-fit rounded-md px-2 py-1 text-sm font-semibold text-primary transition hover:bg-primary/20"
                            disabled={item.quantity <= 1 || isSubmitting}
                          >
                            -
                          </Button>
                          <span className="flex h-8 w-6 items-center justify-center border-b-2 border-b-muted-foreground text-center text-lg font-semibold">
                            {isSubmitting ? (
                              <LoadingSpinnerSmall variant="primary" />
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <Button
                            onClick={() => increaseItemQuantity(item.id)}
                            variant={"ghost"}
                            className="h-fit rounded-md px-2 py-1 text-sm font-semibold text-primary transition hover:bg-primary/20"
                            disabled={isSubmitting}
                          >
                            +
                          </Button>
                        </div>

                        <div className="-ml-2 mr-2 flex justify-end">
                          <button
                            onClick={() => handleEditItem(item.id)}
                            className="flex h-full hover:text-muted-foreground"
                          >
                            <Check size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <>
                    <Separator className="bg-highlight-1" />
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Subtotal:</span>
                      <span>
                        {cartTotal &&
                          cartCurrency &&
                          createPriceString(cartTotal, cartCurrency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Delivery:</span>
                      <span>
                        {cartTotal &&
                          cartCurrency &&
                          createPriceString(cartTotal, cartCurrency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>
                        {cartTotal &&
                          cartCurrency &&
                          createPriceString(cartTotal, cartCurrency)}
                      </span>
                    </div>
                    <Separator className="bg-highlight-1" />
                    <Link href={"/checkout"} className="w-full">
                      <Button className="w-full rounded-none">Checkout</Button>
                    </Link>
                  </>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <p className="text-lg text-highlight-1">Your cart is empty</p>
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
