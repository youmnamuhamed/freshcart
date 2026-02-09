import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must be at most 25 charachters"),
    email: z
      .string()
      .nonempty("email is required")
      .pipe(z.email("Invalid email address")),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),
    rePassword: z.string().nonempty("confirm password is required"),
    phone: z
      .string()
      .nonempty("phone number is required")
      .regex(
        /^01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian phone number",
      ),
    terms: z.boolean().refine((value) => value === true, {
      error: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "password and rePassword must match",
  });

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
