import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addressSchema } from "~/server/schemas/address";
import type Stripe from "stripe";
import {
  createCheckoutSession,
  getStripeCheckoutSession,
} from "~/utils/checkout-session";
import { z } from "zod";
import { nanoid } from "nanoid";

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

export const orderRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(addressSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const cart = await ctx.db.cart.findFirst({
        where: {
          OR: [
            { userId: userId ?? undefined },
            { sessionId: input.cartSessionId ?? undefined },
          ],
        },
        include: {
          items: { include: { product: true, variant: true } },
        },
      });

      if (!cart) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cart not found",
        });
      }

      // Check if the quantity of the items in the cart is greater than the quantity in stock
      for (const item of cart.items) {
        if (item.variant) {
          if (item.quantity > item.variant.stock) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Not enough stock for ${item.product.name}`,
            });
          }
        }

        if (!item.variant) {
          if (item.quantity > item.product.stock) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Not enough stock for ${item.product.name}`,
            });
          }
        }
      }

      const totalCost = cart.items.reduce((acc, item) => {
        const itemPrice = item.variant
          ? item.variant.price * item.quantity
          : item.product.price * item.quantity;
        return acc + itemPrice;
      }, 0);

      const newOrder = await ctx.db.order.create({
        data: {
          email: input.email,
          orderNumber: nanoid(),
          paymentStatus: "pending",
          shippingCost: 499,
          total: totalCost,
          status: "pending",
          shippingMethod: "standard",
          userId: userId ?? null,
          currency: cart.items[0]?.product.currency ?? "GBP",
          sessionId: cart.sessionId,
          ShippingAddress: {
            create: {
              name: input.firstName + " " + input.lastName,
              phone: input.phone,
              country: input.country,
              county: input.county,
              city: input.city,
              postcode: input.postCode,
              email: input.email,
              addressLine1: input.addressLine1,
              addressLine2: input.addressLine2,
              userId: userId ?? null,
            },
          },
          OrderItem: {
            createMany: {
              data: cart.items.map((item) => ({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.product.price,
                currency: item.product.currency,
              })),
            },
          },
        },
        include: {
          ShippingAddress: true,
          OrderItem: {
            include: {
              product: true,
              variant: true,
            },
          },
        },
      });

      const lineItems: LineItem[] = cart.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: item.product.currency,
          unit_amount: item.product.price,
          product_data: {
            name: `${item.product.name} (ID: ${item.id}${item.variantId ? `, Variant ID: ${item.variantId}` : ""})`,
            description: item.product.name,
            metadata: {
              product_variant_id: item.id.toString(),
              product_id: item.product.id?.toString(),
            },
          },
        },
      }));

      const { sessionId } = await createCheckoutSession({
        mode: "payment",
        payment_method_types: ["card"],
        currency: cart.items[0]?.product.currency ?? "gbp",
        customer_email: input.email,
        line_items: lineItems,
        client_reference_id: newOrder.id.toString(),
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 499,
                currency: cart.items[0]?.product.currency ?? "gbp",
              },
              display_name: "Standard Shipping",
            },
          },
        ],
        metadata: {
          order_id: newOrder.id.toString(),
        },
      });

      return {
        checkoutSessionId: sessionId,
      };
    }),

  getOrder: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const stripeSession = await getStripeCheckoutSession(input.sessionId);

      const orderId = stripeSession.metadata?.order_id;
      const orderIdValidated = z.coerce.number().parse(orderId);

      return await ctx.db.order.findFirst({
        where: { id: orderIdValidated },
        include: {
          OrderItem: {
            include: {
              product: { include: { ProductImages: true } },
              variant: true,
            },
          },
          ShippingAddress: true,
        },
      });
    }),
});
