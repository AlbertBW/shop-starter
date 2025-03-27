import { notFound } from "next/navigation";
import Link from "next/link";
import PdfDownload from "./_components/pdf-download";
import Image from "next/image";
import { api } from "~/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import ClearCartForm from "./_components/clear-cart-form";
import { createPriceString } from "~/app/_lib/utils";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id || typeof session_id !== "string") notFound();
  const user = await currentUser();

  const order = await api.order.getOrder({ sessionId: session_id });

  if (!order) {
    notFound();
  }

  const total = order.total + order.shippingCost;

  return (
    <main className="mx-auto w-full max-w-screen-lg px-4 py-6 sm:px-6 lg:px-8">
      <ClearCartForm />
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-light tracking-wide">
          Thank you for your order!
        </h1>
        <div className="mx-auto mt-2 h-1 w-20 bg-primary"></div>
      </div>

      <div className="mb-8 rounded-lg border border-border bg-background p-6">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          {/* Order Summary */}
          <div className="rounded-lg bg-highlight-2/20 p-4 md:w-1/2">
            <h2 className="mb-4 text-xl font-light tracking-wide text-highlight-1">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p>{order.createdAt.toLocaleDateString("en-GB")}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>{createPriceString(order.total, order.currency)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">
                  Shipping ({order.shippingMethod})
                </p>
                <p>{createPriceString(order.shippingCost, order.currency)}</p>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-medium">
                <p>Total</p>
                <p>{createPriceString(total, order.currency)}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="md:w-1/2">
            <h2 className="mb-4 text-xl font-light tracking-wide text-highlight-1">
              Delivery Address
            </h2>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{order.ShippingAddress.name}</p>
              <p>{order.ShippingAddress.addressLine1}</p>
              {order.ShippingAddress.addressLine2 && (
                <p>{order.ShippingAddress.addressLine2}</p>
              )}
              <p>{order.ShippingAddress.city}</p>
              <p>{order.ShippingAddress.county}</p>
              <p>{order.ShippingAddress.postcode}</p>
              <p>{order.ShippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-light tracking-wide text-highlight-1">
          Order Items
        </h2>
        <div className="space-y-4">
          {order.OrderItem.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-lg border border-border bg-background p-4"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                {item.product.ProductImages[0] && (
                  <Image
                    src={item.product.ProductImages[0].imageUrl}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex w-full flex-col">
                <Link
                  href={`/product/${item.product.name}`}
                  className="font-medium transition-colors hover:text-primary"
                >
                  {item.product.name.length > 24
                    ? `${item.product.name.slice(0, 24)}...`
                    : item.product.name}
                </Link>
                {item.variant && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.variant.name}
                  </p>
                )}
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </div>
                  <div className="font-medium">
                    {createPriceString(
                      item.product.price,
                      item.product.currency,
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="no-print mt-8 flex flex-col items-center gap-6">
        {user ? (
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              className="bg-highlight-1 px-6 py-3 font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
              href={`/user-profile/orders/${order.id}`}
            >
              View in your orders
            </Link>
            <Link
              className="border border-border bg-background px-6 py-3 font-semibold uppercase text-foreground transition-colors hover:bg-highlight-2 hover:text-highlight-1"
              href="/user-profile/orders"
            >
              Go to your orders
            </Link>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-background p-4 text-center">
            <p className="mb-3">Create an account to track your orders</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/sign-in"
                className="bg-highlight-1 px-4 py-2 text-sm font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="border border-border bg-background px-4 py-2 text-sm font-semibold uppercase transition-colors hover:bg-highlight-2 hover:text-highlight-1"
              >
                Register
              </Link>
            </div>
          </div>
        )}

        <div className="mt-4">
          <PdfDownload />
        </div>
      </div>
    </main>
  );
}
