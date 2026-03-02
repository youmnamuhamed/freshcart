"use client";
import { faBox, faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IProduct } from "../../types/products.types";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import ProductShipping from "./ProductShipping";

type TabType = "details" | "reviews" | "shipping";

export default function ProductTabs({ product }: { product: IProduct }) {
  const [activeTab, setActiveTab] = useState<TabType>("details");
  return (
    <>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 ${
                    activeTab === "details"
                      ? "flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faBox} /> Product Details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2 ${
                    activeTab === "reviews"
                      ? "flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                    <FontAwesomeIcon icon={faStar} />
                  Reviews ({product.ratingsQuantity})
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2 ${
                    activeTab === "shipping"
                      ? "flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faTruck} /> Shipping & Returns
                </button>
              </div>
            </div>

            {activeTab === "details" && (
              <ProductDescription product={product} />
            )}

            {activeTab === "reviews" && <ProductReviews product={product} />}

            {activeTab === "shipping" && <ProductShipping />}
          </div>
        </div>
      </section>
    </>
  );
}
