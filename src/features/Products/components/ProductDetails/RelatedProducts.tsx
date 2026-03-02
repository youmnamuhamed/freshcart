import React from "react";
import { IProduct } from "../../types/products.types";
import { getRelatedProducts } from "../../server/products.action";
import RelatedProductsCarousel from "./RelatedProductsCarousel";

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  const response = await getRelatedProducts(categoryId);

  const filteredProducts: IProduct[] =
    response.data.filter(
      (product: IProduct) => product._id !== currentProductId,
    ) || [];
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600"> Like </span>{" "}
            </h2>
          </div>
        </div>
        <RelatedProductsCarousel products={filteredProducts.slice(0, 10)} />
      </div>
    </>
  );
}
