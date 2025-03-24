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

  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany({
      include: { _count: true },
    });
    console.log("categories", categories);
    return categories;
  }),
});
