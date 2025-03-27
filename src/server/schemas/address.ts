import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string(),
  city: z.string().min(1, "City is required"),
  county: z.string().min(1, "State is required"),
  postCode: z
    .string()
    .min(1, "Post code is required")
    .regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, "Invalid post code format"),
  country: z.string().min(1, "Country is required"),
  phone: z.string(),
  email: z.string().email("Invalid email address"),
  cartSessionId: z.string(),
});
