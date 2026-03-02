import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .nonempty("Full name is required")
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),

  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0-9]{9}$/, "Phone number must be valid (01xxxxxxxxx)"),
});

export type UpdateProfileFormValues = z.infer<
  typeof UpdateProfileSchema
>;