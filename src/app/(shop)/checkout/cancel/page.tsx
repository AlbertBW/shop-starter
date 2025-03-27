import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Order Cancelled | Shop Starter",
  description: "Your order has been cancelled",
};

export default async function CancelPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id || typeof session_id !== "string") {
    return notFound();
  }

  await api.order.deleteOrder({ stripeSessionId: session_id });

  return (
    <main className="mx-auto w-full max-w-screen-lg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-light tracking-wide">Payment Cancelled</h1>
        <div className="mx-auto mt-2 h-1 w-20 bg-primary"></div>
      </div>

      <div className="rounded-lg border border-border bg-background p-8">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-highlight-2/20">
            <ShoppingCartIcon className="h-8 w-8 text-highlight-1" />
          </div>
          <h2 className="mb-2 text-xl font-medium">
            Your order has not been completed
          </h2>
          <p className="mb-6 text-muted-foreground">
            Your payment was cancelled and you have not been charged.
            <br />
            Items in your cart have been saved.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="bg-highlight-1 px-6 py-3 text-center font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
          >
            Return home
          </Link>
          <Link
            href="/checkout"
            className="border border-border bg-background px-6 py-3 text-center font-semibold uppercase text-foreground transition-colors hover:bg-highlight-2 hover:text-highlight-1"
          >
            Try again
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="mb-4 text-xl font-light text-highlight-1">
          Need help with your order?
        </h3>
        <p className="text-muted-foreground">
          If you have any questions or concerns about your order,{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact our support team
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
