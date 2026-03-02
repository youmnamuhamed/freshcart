"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  IProductsResponse,
  singleProductResponse,
} from "../types/products.types";

export async function getProducts(): Promise<IProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsById({
  id,
}: {
  id: string;
}): Promise<singleProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRelatedProducts(categoryId: string) {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetProductsByBrand(
  brandId: string,
): Promise<IProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    };

    const { data } = await axios.request<IProductsResponse>(options);

    return data;
  } catch (error) {
    console.error("Error fetching brand products:", error);
    throw new Error("Failed to fetch brand products");
  }
}
