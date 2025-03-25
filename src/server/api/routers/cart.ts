import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  addCartItem: publicProcedure
    .input(
      z.object({
        sessionId: z.string().optional(),
        productId: z.number(),
        variantId: z.number().optional(),
        quantity: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId && !input.sessionId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated and no session ID provided",
        });
      }

      let userCart = await ctx.db.cart.findFirst({
        where: userId ? { userId } : { sessionId: input.sessionId },
      });

      if (!userCart) {
        userCart = await ctx.db.cart.create({
          data: {
            userId: userId,
            sessionId: !userId ? input.sessionId : undefined,
          },
        });

        if (!userCart) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create user cart",
          });
        }
      }

      const cartItem = await ctx.db.cartItem.create({
        data: {
          productId: input.productId,
          variantId: input.variantId,
          quantity: input.quantity,
          cartId: userCart.id,
        },
      });

      return cartItem;
    }),

  getCartItems: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const cart = await ctx.db.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                ProductImages: true,
                ProductVariants: true,
              },
            },
          },
        },
      },
    });

    return cart;
  }),
});
