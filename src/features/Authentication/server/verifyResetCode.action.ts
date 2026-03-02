"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  VerifyResetCodeFormValues,
  VerifyResetCodeSchema,
} from "../Schemas/verifyResetCode.schema";

export default async function verifyResetCodeAction(
  values: VerifyResetCodeFormValues,
) {
  // 1. Validate input
  const validationResult = VerifyResetCodeSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    });

    return { success: false, message: "validationErrors", errors };
  }

  // 2. Call API
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      method: "POST",
      data: validationResult.data, // contains resetCode
    };

    const { data } = await axios.request(options);

    if (data.statusMsg === "success") {
      return {
        success: true,
        message: "Reset code verified successfully",
      };
    }

    return {
      success: false,
      message: data.message || "Failed to verify reset code",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data?.message;

      if (
        typeof errorMsg === "string" &&
        errorMsg.toLowerCase().includes("invalid code")
      ) {
        return {
          success: false,
          message: "Invalid reset code",
          errors: {
            resetCode: "Invalid reset code",
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
