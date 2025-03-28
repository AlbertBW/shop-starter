import BackButton from "~/app/_components/back-button";
import Checkout from "./_components/checkout";

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

      <Checkout />
    </main>
  );
}
