"use server";

import { email, success } from "zod";
import { SignUpFormValues, SignUpSchema } from "./../Schemas/signup.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function signUpActions(values: SignUpFormValues) {
  //VALIDATION
  const validationResult = SignUpSchema.safeParse(values);
  console.log({ validationResult });

  const errors: Record<string, string> = {};

  if (validationResult.error) {
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
  const { terms, ...requestBody } = values;
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: requestBody,
    };
    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "account created successfully",
        data,
      };
    }
    return {
      success: false,
      message: data.message || "something went wrong",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const erorrMsg = error.response?.data.message;
      if (
        typeof erorrMsg === "string" &&
        erorrMsg.toLowerCase().includes("account already exists")
      ) {
        return {
          success: false,
          message: "An account with this email already exists",
          errors: {
            email: "Email already exists",
          },
        };
      }
      return {
        success: false,
        message: "Something went wrong, Try again later",
      };
    }
  }
}

