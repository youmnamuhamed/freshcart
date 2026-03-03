import React from "react";
import { getRelatedProducts } from "../server/products.action";
import AllProducts from "../components/AllProducts";
import Image from "next/image";
import Link from "next/link";
import {
  GetAllCategories,
  GetCategoryById,
  GetSubCategoriesByCategoryId,
} from "@/features/Categories/server/categories.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTags, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  categoryId: string; // plain string now
}
export default async function CategoryProductsScreen({ categoryId }: Props) {
  const [productsRes, allCategoriesRes] = await Promise.all([
    getRelatedProducts(categoryId),
    GetAllCategories(),
  ]);

  const products = productsRes.data;
  const category = allCategoriesRes.data.find((cat) => cat._id === categoryId);

  if (!category) return <p>Category not found.</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
          <div className="container mx-auto px-4 py-10 sm:py-12">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link
                className="hover:text-white transition-colors duration-200"
                href={`/`}
              >
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">Categories</span>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">{category.name}</span>
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <Image
                  src={category.image}
                  className="w-12 h-12 object-contain"
                  alt={category.name}
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {category.name}
                </h1>
                <p className="text-white/80 mt-1">
                  Choose a subcategory to browse products
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <FontAwesomeIcon icon={faFilter} />
              Active Filters:
            </span>
            <Link
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
              href={`/products`}
            >
              <FontAwesomeIcon icon={faTags} />
              {category.name}
              <FontAwesomeIcon icon={faXmark} />
            </Link>
            <Link
              href={`/products`}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear All
            </Link>
          </div>

          <AllProducts products={products} showBanner={false} />
        </div>
      </div>
    </>
  );
}
