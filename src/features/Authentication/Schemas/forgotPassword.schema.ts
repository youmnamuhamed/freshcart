import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
});

export type ForgotPasswordFormValues = z.infer<
  typeof ForgotPasswordSchema
>;
