"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import {
  AddressesResponse,
  AddAddressPayload,
  Address,
} from "../Types/addresses.types";

// helper to get token
async function getTokenFromCookies(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  return token;
}

// Get all addresses
export async function getAddresses(): Promise<AddressesResponse> {
  const token = await getTokenFromCookies();

  const options: AxiosRequestConfig = {
    url: "https://ecommerce.routemisr.com/api/v1/addresses",
    method: "GET",
    headers: {
      token,
    },
  };

  const { data } = await axios.request(options);
  return data;
}

// Add a new address
export async function addAddress(payload: AddAddressPayload): Promise<Address> {
  const token = await getTokenFromCookies();

  const options: AxiosRequestConfig = {
    url: "https://ecommerce.routemisr.com/api/v1/addresses",
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      token,
    },
  };

  const { data } = await axios.request(options);
  return data.data; // API usually returns { message, data }
}

// Delete an address
export async function deleteAddress(id: string): Promise<void> {
  const token = await getTokenFromCookies();

  const options: AxiosRequestConfig = {
    url: `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
    method: "DELETE",
    headers: {
      token,
    },
  };

  await axios.request(options);
}

export async function updateAddress(
  id: string,
  payload: AddAddressPayload,
): Promise<Address> {
  const token = await getTokenFromCookies();

  const options: AxiosRequestConfig = {
    url: `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
    method: "PUT",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      token,
    },
  };

  const { data } = await axios.request(options);
  return data.data;
}
