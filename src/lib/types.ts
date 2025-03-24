import { z } from "zod";

export type OrderByOptions =
  | "popular"
  | "latest"
  | "priceDesc"
  | "priceAsc"
  | "A-Z"
  | "Z-A";

export const orderBySchema = z.enum([
  "popular",
  "latest",
  "priceDesc",
  "priceAsc",
  "A-Z",
  "Z-A",
]) as z.ZodType<OrderByOptions>;
