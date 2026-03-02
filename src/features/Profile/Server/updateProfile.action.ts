"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import {
  UpdateProfileSchema,
  UpdateProfileFormValues,
} from "../Schemas/updateProfile.schema";

export default async function UpdateProfileAction(
  values: UpdateProfileFormValues,
) {
  // 1️⃣ Validate data
  const validationResult = UpdateProfileSchema.safeParse(values);

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
    // 2️⃣ Get token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized - No token found",
      };
    }

    // 3️⃣ Axios config
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      method: "PUT",
      headers: {
        token,
      },
      data: values,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "Profile updated successfully",
        data,
      };
    }

    return {
      success: false,
      message: "Profile update failed",
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
