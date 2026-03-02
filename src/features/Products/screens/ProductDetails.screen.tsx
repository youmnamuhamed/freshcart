import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductTabs from "../components/ProductDetails/ProductTabs";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import { getProductsById } from "../server/products.action";
import { singleProductResponse } from "../types/products.types";

interface ProductDetailsScreenProps {
  productId: string;
}

export async function ProductDetailsScreen({
  productId,
}: ProductDetailsScreenProps) {
  try {
    const response: singleProductResponse = await getProductsById({
      id: productId,
    });

    if (!response?.data) {
      return <p>Product not found.</p>;
    }

    return (
      <>
        <ProductInfo product={response.data} />
        <ProductTabs product={response.data} />
        <RelatedProducts
          categoryId={response.data.category._id}
          currentProductId={response.data._id}
        />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return <p>Failed to load product details.</p>;
  }
}
