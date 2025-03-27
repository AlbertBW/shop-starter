import { z } from "zod";
import { db } from "~/server/db";

export async function completeOrder({
  orderId,
  paymentIntentId,
}: {
  orderId: string;
  paymentIntentId: string;
}) {
  const orderIdValidated = z.coerce.number().parse(orderId);

  const order = await db.order.update({
    where: { id: orderIdValidated },
    data: {
      paymentStatus: "completed",
      paymentIntentId,
      status: "processing",
      updatedAt: new Date(),
    },
    include: {
      OrderItem: true,
    },
  });

  // Update the stock of the products in the order
  for (const item of order.OrderItem) {
    if (item.variantId) {
      await db.productVariant.update({
        where: { id: item.variantId },
        data: {
          stock: { decrement: item.quantity },
          product: { update: { stock: { decrement: item.quantity } } },
        },
      });
    } else {
      await db.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
  }
}
