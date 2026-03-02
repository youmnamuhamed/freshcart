import { faArrowRight, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { IBrand } from "../types/brands.types";

export default function Brands({ brands }: { brands: IBrand[] }) {
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
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
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <FontAwesomeIcon icon={faTags} />
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
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    width={100}
                    height={100}
                  />
                </div>

                <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
                  {brand.name}
                </h3>

                <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-violet-600 flex items-center gap-1">
                    View Products
                  </span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-violet-600 text-xs" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
