export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoriesResponse {
  results: number;
  metadata: CategoriesMetadata;
  data: Category[];
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SingleCategoryResponse {
  results: number;
  data: {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    subcategories: ISubcategory[];
  };
}
export interface SubCategoriesResponse {
  results: number;
  data: ISubcategory[];
}
