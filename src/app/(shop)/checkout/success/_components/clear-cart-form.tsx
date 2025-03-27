"use client";

import { useEffect } from "react";
import { useShoppingCart } from "~/app/_context/shopping-cart-context";

export default function ClearCartForm() {
  const { clearCart, isLoading } = useShoppingCart();
  useEffect(() => {
    if (!isLoading) {
      const form = document.getElementById(
        "clear-cart-form",
      ) as HTMLFormElement;
      form.requestSubmit();
    }
  }, [isLoading]);
  return <form id="clear-cart-form" action={clearCart}></form>;
}
