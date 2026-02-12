// Metadata for pagination
export interface IMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

// Subcategory type
export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category type
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand type
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Individual Product type
export interface IProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  subcategory: ISubcategory[];
  createdAt: string;
  updatedAt: string;
}

// Products API Response type
export interface IProductsResponse {
  results: number;
  metadata: IMetadata;
  data: IProduct[];
}

export interface singleProductResponse {
  data: IProduct;
}
