"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  CategoriesResponse,
  SingleCategoryResponse,
  SubCategoriesResponse,
} from "../types/categories.types";

export async function GetAllCategories(): Promise<CategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetCategoryById(
  categoryId: string,
): Promise<SingleCategoryResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
      method: "GET",
      
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetSubCategoriesByCategoryId(
  categoryId: string,
): Promise<SubCategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
