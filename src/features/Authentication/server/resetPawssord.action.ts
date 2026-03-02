"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ResetPasswordFormValues, ResetPasswordSchema } from "../Schemas/resetPassword.schema";

export default async function resetPasswordAction(values: ResetPasswordFormValues) {
  // 1️⃣ Validate input
  const validationResult = ResetPasswordSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!errors[field]) errors[field] = issue.message;
    });

    return {
      success: false,
      message: "validationErrors",
      errors,
    };
  }

  // 2️⃣ Call API
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      method: "POST",
      data: {
        email: validationResult.data.email,
        password: validationResult.data.newPassword,
        confirmPassword: validationResult.data.rePassword,
      },
    };

    const { data } = await axios.request(options);

    if (data.statusMsg === "success") {
      return { success: true, message: "Password reset successfully" };
    }

    return { success: false, message: data.message || "Failed to reset password" };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }

    return { success: false, message: "Unexpected error occurred" };
  }
}


