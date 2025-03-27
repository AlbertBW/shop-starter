import Link from "next/link";
import CheckoutForm from "./_components/checkout-form";
import OrderSummary from "./_components/order-summary";
import BackButton from "~/app/_components/back-button";

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 md:py-8 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-wide">Checkout</h1>
        <div className="mt-2 h-1 w-20 bg-primary" />
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="rounded-lg border border-border bg-background p-6">
            <CheckoutForm />
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="rounded-lg border border-border bg-background p-6">
            <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
            <OrderSummary />

            <div className="mt-6 flex flex-col gap-4">
              <button
                type="button"
                className="w-full bg-highlight-1 px-6 py-3 font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
              >
                Complete Order
              </button>
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
    </main>
  );
}
