import { ProductDetailsScreen } from "@/features/Products/screens/ProductDetails.screen";

type ProductDetailsPageProps = {
  params: { id: string };
};

export default async function ProductDetails({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <ProductDetailsScreen productId={id} />
  );
}
