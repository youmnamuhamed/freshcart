"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoginFormValues, LoginSchema } from "../Schemas/login.schema";
import { success } from "zod";
export default async function LoginAction(values: LoginFormValues) {
  const validationResult = LoginSchema.safeParse(values);

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
      message: "validation errors",
      errors,
    };
  }
  try {
    const { rememberMe, ...requestData } = values;

    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: requestData,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "User logged in successfully",
        data,
      };
    }
    return {
      success: false,
      message: "Login failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data.message;
      if (errorMsg === "incorrect email or password ") {
        return {
          success: false,
          message: "wrong vredentials",
          errors: {
            password: "incorrect emailor password",
          },
        };
      }
    }
  }
}
