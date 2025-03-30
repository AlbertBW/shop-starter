import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getAll: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const categories = await ctx.db.category.findMany({
        include: {
          _count: {
            select: {
              Product: {
                where: {
                  name: {
                    contains: input.search ?? "",
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        },
      });

      return categories;
    }),
});
