export interface WishlistProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistProductSubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface WishlistProductDetails {
  subCategory: WishlistProductSubCategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: WishlistProductCategory;
  brand: WishlistProductBrand[];
  ratingsAverage: number;
  price: number;
  id: string;
}

export interface WishlistData {
  _id: string;
  wishlistOwner: string;
  products: WishlistProductDetails[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WishlistResponse {
  status: string;
  count: number;
  wishlistId: string;
  data: WishlistProductDetails[];
}