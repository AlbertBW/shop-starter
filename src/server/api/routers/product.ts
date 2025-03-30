import { TRPCError } from "@trpc/server";
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
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      return product;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        categorySlug: z.string().optional(),
        orderBy: orderBySchema.optional(),
        search: z.string().optional(),
        limit: z.number().optional(),
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const take = input.limit ?? PRODUCTS_PER_PAGE;
      const skip = input.page ? (input.page - 1) * take : 0;

      const products = await ctx.db.product.findMany({
        include: { ProductImages: { take: 1 } },
        take,
        skip,
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
          category: {
            slug: input.categorySlug ?? undefined,
          },
          name: {
            contains: input.search,
            mode: "insensitive",
          },
        },
      });

      return products;
    }),
});
