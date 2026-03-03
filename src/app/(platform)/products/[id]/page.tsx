import { ProductDetailsScreen } from "@/features/Products/screens/ProductDetails.screen";

type ProductDetailsPageProps = {
  params: { id: string };
};

export default async function ProductDetails({ params }: ProductDetailsPageProps) {
  const { id } =await params;
  console.log("Product ID from URL:", id);

  return <ProductDetailsScreen productId={id} />;
}

