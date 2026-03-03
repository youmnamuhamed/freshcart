import {
  faArrowLeft,
  faArrowRight,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import {
  GetCategoryById,
  GetSubCategoriesByCategoryId,
} from "../server/categories.action";

interface Props {
  categoryId: string; 
}

export default async function SubCategories({ categoryId }: Props) {
  console.log("categoryId:", categoryId); 

  const categoryRes = await GetCategoryById(categoryId);
  const subRes = await GetSubCategoriesByCategoryId(categoryId);

  const category = categoryRes.data;
  const subcategories = subRes.data;
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
        <div className="container mx-auto px-4 py-10">
          <Link
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
            href={`/categories`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span>Back to Categories</span>
          </Link>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              {subcategories.length} SubCategories for {category.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory._id}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
                href={`/products?subcategory=${subcategory._id}`}
              >
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <FontAwesomeIcon
                    icon={faFolderOpen}
                    className="text-primary-600 text-2xl"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors mb-2">
                  {subcategory.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Browse Products</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
