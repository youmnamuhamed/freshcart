"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import {
  ChangePasswordSchema,
  ChangePasswordFormValues,
} from "../Schemas/changePassword.schema";

export default async function ChangePasswordAction(
  values: ChangePasswordFormValues,
) {
  // 1️⃣ Validate form data
  const validationResult = ChangePasswordSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const message = issue.message;

      if (!errors[key]) {
        errors[key] = message;
      }
    });

    return {
      success: false,
      message: "Validation errors",
      errors,
    };
  }

  try {
    // 2️⃣ Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized - No token found",
      };
    }

    // 3️⃣ Prepare request body
    const requestData = {
      currentPassword: values.oldPassword,
      password: values.newPassword,
      rePassword: values.confirmNewPassword,
    };

    // 4️⃣ Axios config
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      method: "PUT",
      headers: {
        token,
      },
      data: requestData,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "Password changed successfully",
        data,
      };
    }

    return {
      success: false,
      message: "Password change failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data?.message;

      return {
        success: false,
        message: errorMsg || "Something went wrong",
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
