import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { GetAllCategories } from "../server/categories.action";

export default async function AllCategories() {
  const response = await GetAllCategories();
  response.data.forEach((category) => {
    console.log(category._id);
  });
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
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <FontAwesomeIcon icon={faLayerGroup} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  All Categories
                </h1>
                <p className="text-white/80 mt-1">
                  Browse our wide range of product categories
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {response.data.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                  />
                </div>

                <h3 className="font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
