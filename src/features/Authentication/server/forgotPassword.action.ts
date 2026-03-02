"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema,
} from "../Schemas/forgotPassword.schema";

export default async function forgotPasswordAction(
  values: ForgotPasswordFormValues
) {
  // ✅ 1. Validate using Zod
  const validationResult = ForgotPasswordSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    validationResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      const message = issue.message;

      if (!errors[field]) {
        errors[field] = message;
      }
    });

    return {
      success: false,
      message: "validationErrors",
      errors,
    };
  }

  // ✅ 2. Call API
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: validationResult.data, // contains email
    };

    const { data } = await axios.request(options);

    if (data.statusMsg === "success") {
      return {
        success: true,
        message: "Reset code sent successfully",
      };
    }

    return {
      success: false,
      message: data.message || "Failed to send reset code",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data?.message;

      if (
        typeof errorMsg === "string" &&
        errorMsg.toLowerCase().includes("no user found")
      ) {
        return {
          success: false,
          message: "No account found with this email",
          errors: {
            email: "No account found with this email",
          },
        };
      }

      return {
        success: false,
        message: errorMsg || "Something went wrong, try again later",
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}