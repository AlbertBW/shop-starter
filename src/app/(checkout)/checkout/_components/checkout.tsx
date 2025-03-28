"use client";

import { Button } from "~/app/_components/ui/button";
import CheckoutForm from "./checkout-form";
import OrderSummary from "./order-summary";
import Link from "next/link";
import { useRef } from "react";

export default function Checkout() {
  const formId = "checkout-form";

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="rounded-lg border border-border bg-background p-6">
          <CheckoutForm formId={formId} />
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="rounded-lg border border-border bg-background p-6">
          <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
          <OrderSummary />

          <div className="mt-6 flex flex-col gap-4">
            <Button
              type="submit"
              form={formId}
              className="w-full rounded-none bg-highlight-1 px-6 py-3 font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
            >
              Complete Order
            </Button>
            <Link
              href="/products"
              className="text-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
