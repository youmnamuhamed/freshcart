import ProductCard from "@/features/Products/components/ProductCard";
import { IBrand, IProduct } from "@/features/Products/types/products.types";
import {
  faBoxOpen,
  faFilter,
  faTags,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function BrandDetails({
  brand,
  products,
}: {
  brand: IBrand;
  products: IProduct[];
}) {
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
              <span className="text-white font-medium">Brands</span>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">{brand.name}</span>
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Top Brands
                </h1>
                <p className="text-white/80 mt-1">
                  Shop from your favorite brands
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
              {brand.name}
              <FontAwesomeIcon icon={faXmark} />
            </Link>
            <Link
              href={`/products`}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear All
            </Link>
          </div>
          {products.length > 0 && (
            <div className="mb-6 text-sm text-gray-500">
              Showing {products.length} products
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="text-gray-400 text-2xl"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Products Found
              </h3>

              <p className="text-gray-500 mb-6">
                No products match your current filters.
              </p>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                View All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} info={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
