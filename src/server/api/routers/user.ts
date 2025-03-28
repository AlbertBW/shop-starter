import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

const USER_LIST_LIMIT = 10;
export const UserOrderByOptions = [
  "created_at",
  "updated_at",
  "email_address",
  "web3wallet",
  "first_name",
  "last_name",
  "phone_number",
  "username",
  "last_active_at",
  "last_sign_in_at",
] as const;

export const userRouter = createTRPCRouter({
  getUserList: adminProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        page: z.number().optional(),
        orderBy: z.enum(UserOrderByOptions).optional(),
        emailAddress: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const {
        limit = USER_LIST_LIMIT,
        page = 1,
        orderBy = "created_at",
      } = input;
      const client = await clerkClient();
      const users = await client.users.getUserList({
        limit,
        offset: (page - 1) * limit,
        orderBy,
        emailAddress: input.emailAddress ? [input.emailAddress] : undefined,
        query: input.search,
      });

      return users;
    }),

  ban: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const client = await clerkClient();

      const bannedUser = await client.users.banUser(input.userId);

      if (!bannedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return bannedUser;
    }),

  unban: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const client = await clerkClient();

      const unbannedUser = await client.users.unbanUser(input.userId);

      if (!unbannedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return unbannedUser;
    }),
});
