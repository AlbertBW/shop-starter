import { z } from "zod";
import { PRODUCTS_PER_PAGE } from "~/lib/constants";
import { orderBySchema } from "~/lib/types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          ProductImages: true,
          ProductVariants: true,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        categoryId: z.number().optional(),
        orderBy: orderBySchema.optional(),
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        include: { ProductImages: { take: 1 } },
        take: PRODUCTS_PER_PAGE,
        skip: input.page ? (input.page - 1) * PRODUCTS_PER_PAGE : 0,
        orderBy: {
          createdAt: input.orderBy === "latest" ? "asc" : undefined,
          sold: input.orderBy === "popular" ? "desc" : undefined,
          price:
            input.orderBy === "priceDesc"
              ? "desc"
              : input.orderBy === "priceAsc"
                ? "asc"
                : undefined,
          name:
            input.orderBy === "A-Z"
              ? "asc"
              : input.orderBy === "Z-A"
                ? "desc"
                : undefined,
        },
        where: {
          categoryId: input.categoryId ?? undefined,
        },
      });

      console.log("products", products);
      return products;
    }),
});
