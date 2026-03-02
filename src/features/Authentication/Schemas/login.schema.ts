import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
  password: z.string().nonempty("Password is required"),
  rememberMe: z.boolean().optional(),

});

export type LoginFormValues = z.infer<typeof LoginSchema>;
