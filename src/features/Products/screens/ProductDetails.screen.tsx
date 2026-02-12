import ProductInfo from "../components/ProductDetails/ProductInfo";
import { getProductsById } from "../server/products.action";

export async function ProductDetailsScreen({
  productId,
}: {
  productId: string;
}) {
  const response = await getProductsById({ id: productId });
  console.log(response);
  

  return (
    <>
      <ProductInfo product={response.data}/>
    </>
  );
}
