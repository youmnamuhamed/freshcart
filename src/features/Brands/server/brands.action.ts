"use server";

import axios, { AxiosRequestConfig } from "axios";
import { BrandsResponse, SingleBrandResponse } from "../types/brands.types";

export async function GetAllBrands(): Promise<BrandsResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/brands",
    };

    const { data } = await axios.request<BrandsResponse>(options);

    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to fetch brands");
  }
}
export async function GetBrandById(
  brandId: string,
): Promise<SingleBrandResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    };

    const { data } = await axios.request<SingleBrandResponse>(options);

    return data;
  } catch (error) {
    console.error("Error fetching brand details:", error);
    throw new Error("Failed to fetch brand details");
  }
}
