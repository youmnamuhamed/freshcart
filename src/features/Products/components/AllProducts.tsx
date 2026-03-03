import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { IProduct } from "../types/products.types";
import AllProductsBanne from "./AllProductsBanne";

interface Props {
  products: IProduct[];
  showBanner?: boolean;
}

export default function Products({ products, showBanner = true }: Props) {
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
             {showBanner && <AllProductsBanne />}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 text-sm text-gray-500">
            Showing {products.length} products
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} info={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
