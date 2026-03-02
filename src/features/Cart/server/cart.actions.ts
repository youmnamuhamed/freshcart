"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartResponse } from "../Types/cart.types";

export async function addProductToCart({ ProductId }: { ProductId: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "POST",
      headers: {
        token,
      },
      data: {
        productId: ProductId,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    console.log("Error:", error.response?.data || error.message);
    throw error;
  }
}

export async function getLoggedUserCart(): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromCart(
  productId: string,
): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProductQuantity(
  productId: string,
  count: number,
): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      method: "PUT",
      headers: {
        token,
      },
      data: {
        count,
      }
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
