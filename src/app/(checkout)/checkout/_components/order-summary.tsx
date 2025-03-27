"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useShoppingCart } from "~/app/_context/shopping-cart-context";
import { createPriceString } from "~/app/_lib/utils";

export default function OrderSummary() {
  const { isLoading, cart, subtotalPrice, subtotalPriceString, currency } =
    useShoppingCart();

  if (isLoading) {
    return null;
  }

  if (!cart) {
    redirect("/");
  }

  const shipping = 499;
  const total = subtotalPrice + shipping;
  const totalPriceString = createPriceString(total, currency);

  return (
    <div className="space-y-4">
      {/* Cart items */}
      <div className="space-y-3">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-start space-x-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
              {item.product.ProductImages[0]?.imageUrl && (
                <Image
                  src={item.product.ProductImages[0].imageUrl}
                  alt={item.product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.product.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="text-sm font-medium">
              {item.variant
                ? createPriceString(item.variant.price, item.variant.currency)
                : createPriceString(item.product.price, item.product.currency)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 pt-4">
        <input
          type="text"
          placeholder="Coupon code"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-primary/90"
        >
          Apply
        </button>
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-medium">{subtotalPriceString}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Shipping</p>
          <p className="font-medium">£{shipping}</p>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base font-medium">
          <p>Total</p>
          <p>{totalPriceString}</p>
        </div>
      </div>
    </div>
  );
}
