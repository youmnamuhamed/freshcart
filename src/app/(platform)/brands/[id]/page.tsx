import BrandDetailsScreen from "@/features/Brands/Screens/BrandDetails.screen";

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BrandDetailsScreen brandId={id} />;
}