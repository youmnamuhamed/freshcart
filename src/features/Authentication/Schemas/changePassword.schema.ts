import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().nonempty("Old password is required"),

    newPassword: z
      .string()
      .nonempty("New password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmNewPassword: z.string().nonempty("Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;
