"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { WishlistResponse } from "../types/wishlist.types";

export async function addProductToWishlist({
  ProductId,
}: {
  ProductId: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
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

export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
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

export async function removeProductFromWishlist(
  productId: string,
): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
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
