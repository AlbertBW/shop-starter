import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  addCartItem: publicProcedure
    .input(
      z.object({
        sessionId: z.string().optional(),
        productId: z.number(),
        variantId: z.number().nullable(),
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

  getCart: publicProcedure
    .input(z.object({ cartSessionId: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { cartSessionId } = input;

      if (!userId && !cartSessionId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated and no session ID provided",
        });
      }
      const include = {
        items: {
          include: {
            variant: true,
            product: {
              include: {
                ProductImages: true,
              },
            },
          },
        },
      };

      // If the user has created an account, this will be true
      // Update the cart to add the userId
      if (userId && cartSessionId) {
        // Find all the carts with the sessionId or userId
        const carts = await ctx.db.cart.findMany({
          where: { OR: [{ sessionId: cartSessionId }, { userId }] },
          include: { items: true },
        });

        if (carts.length === 0) {
          const cart = await ctx.db.cart.create({
            data: {
              userId,
            },
            include,
          });

          if (!cart) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create user cart",
            });
          }

          return cart;
        }
        if (carts.length === 1) {
          const cart = carts[0];

          if (!cart) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create user cart",
            });
          }

          const updated = await ctx.db.cart.update({
            where: { id: cart.id },
            data: { userId, sessionId: null },
            include,
          });

          return updated;
        }

        // If there are multiple carts, we need to merge them
        const cart = carts[0];

        if (!cart) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create user cart",
          });
        }

        // Merge the carts
        const cartItems = carts.flatMap((cart) => cart.items);

        const uniqueItems = Array.from(
          new Set(cartItems.map((item) => item.productId)),
        ).map((productId) => {
          const foundItem = cartItems.find(
            (item) => item.productId === productId,
          );
          if (!foundItem) {
            throw new Error(`Cart item not found for productId: ${productId}`);
          }
          return foundItem;
        });

        const mergedCart = await ctx.db.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              connect: uniqueItems.map((item) => ({
                id: item.id,
              })),
            },
            userId,
            sessionId: null,
          },
          include,
        });

        // Delete the other carts
        await ctx.db.cart.deleteMany({
          where: {
            id: {
              in: carts.filter((c) => c.id !== cart.id).map((c) => c.id),
            },
          },
        });
        return mergedCart;
      }

      let cart = await ctx.db.cart.findFirst({
        where: cartSessionId ? { sessionId: cartSessionId } : { userId },
        include,
      });

      if (!cart) {
        cart = await ctx.db.cart.create({
          data: {
            sessionId: cartSessionId,
            userId: userId,
          },
          include,
        });

        if (!cart) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create user cart",
          });
        }

        return cart;
      }

      return cart;
    }),

  deleteCartItem: publicProcedure
    .input(
      z.object({
        cartItemId: z.number(),
        cartSessionId: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { cartItemId, cartSessionId } = input;

      if (!userId && !cartSessionId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated and no session ID provided",
        });
      }

      const cartItem = await ctx.db.cartItem.findFirst({
        where: {
          id: cartItemId,
          cart: { sessionId: !userId ? cartSessionId : null, userId },
        },
      });

      if (!cartItem) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart item not found",
        });
      }

      await ctx.db.cartItem.delete({
        where: { id: cartItem.id },
      });

      return true;
    }),

  updateCartItemQuantity: publicProcedure
    .input(
      z.object({
        cartItemId: z.number(),
        quantity: z.number().min(1),
        cartSessionId: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { cartItemId, quantity, cartSessionId } = input;

      if (!userId && !cartSessionId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated and no session ID provided",
        });
      }

      const cartItem = await ctx.db.cartItem.findFirst({
        where: {
          id: cartItemId,
          cart: { sessionId: !userId ? cartSessionId : null, userId },
        },
      });

      if (!cartItem) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart item not found",
        });
      }

      await ctx.db.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity },
      });

      return true;
    }),
});
