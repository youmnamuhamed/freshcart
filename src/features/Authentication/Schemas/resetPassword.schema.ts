import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .pipe(z.email("Invalid email address")),

    newPassword: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),

    rePassword: z
      .string()
      .nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords must match",
  });

export type ResetPasswordFormValues = z.infer<
  typeof ResetPasswordSchema
>;