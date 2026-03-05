"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { OrdersResponse } from "../types/orders.types";

interface DecodedToken {
  id: string;
}

export async function getLoggedUserOrders(): Promise<OrdersResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }

  const decoded = jwtDecode<DecodedToken>(token);
  const userId = decoded.id;

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
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
