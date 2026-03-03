import React from "react";
import { getProductsBySubcategory } from "../server/products.action";
import AllProducts from "../components/AllProducts";
import Image from "next/image";
import Link from "next/link";
import {
  GetAllCategories,
  GetSubCategoriesByCategoryId,
} from "@/features/Categories/server/categories.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTags, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  subcategoryId: string;
}

export default async function SubcategoryProductsScreen({
  subcategoryId,
}: Props) {
  const allCategoriesRes = await GetAllCategories();
  const categories = allCategoriesRes.data;

  const allSubcategoriesRes = await Promise.all(
    categories.map((cat) => GetSubCategoriesByCategoryId(cat._id)),
  );

  const allSubcategories = allSubcategoriesRes.flatMap((res) => res.data);
  const subcategory = allSubcategories.find((sub) => sub._id === subcategoryId);

  const parentCategory = categories.find((cat) =>
    allSubcategoriesRes.some((res) =>
      res.data.some(
        (sub) => sub._id === subcategoryId && sub.category === cat._id,
      ),
    ),
  );

  const productsRes = await getProductsBySubcategory(subcategoryId);
  const products = productsRes.data;

  if (!subcategory) return <p>Subcategory not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Banner */}
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link
              className="hover:text-white transition-colors duration-200"
              href="/"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              className="hover:text-white transition-colors duration-200"
              href="/categories"
            >
              Categories
            </Link>
            {parentCategory && (
              <>
                <span className="text-white/40">/</span>
                <Link
                  className="hover:text-white transition-colors duration-200"
                  href={`/products?category=${parentCategory._id}`}
                >
                  {parentCategory.name}
                </Link>
              </>
            )}
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{subcategory.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {subcategory.name}
              </h1>
              <p className="text-white/80 mt-1">
                Browse products in {subcategory.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Products */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faFilter} />
            Active Filters:
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium">
            <FontAwesomeIcon icon={faTags} />
            {subcategory.name}
            <Link href="/products">
              <FontAwesomeIcon
                icon={faXmark}
                className="hover:text-red-500 cursor-pointer"
              />
            </Link>
          </span>
          <Link
            href="/products"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear All
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing {products.length} products
        </p>

        <AllProducts products={products} showBanner={false} />
      </div>
    </div>
  );
}
