export interface CartSubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
export interface CartCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface CartBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface CartProductDetails {
  subCategory: CartSubCategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: CartCategory;
  brand: CartBrand[];
  ratingsAverage: number;
  id: string;
}
export interface CartItem {
  _id: string;
  product: CartProductDetails;
  count: number;
  price: number;
}
export interface CartData {
  _id: string;
  CartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
export interface CartResponse {
  status: string;
  numberOfCartItems: number;
  cartId: string;
  data: CartData;
}
