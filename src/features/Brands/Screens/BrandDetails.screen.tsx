import BrandDetails from "../Components/BrandDetails";
import { GetBrandById } from "../server/brands.action";
import { GetProductsByBrand } from "../../Products/server/products.action";

export default async function BrandDetailsScreen({
  brandId,
}: {
  brandId: string;
}) {
  console.log("BrandDetailsScreen", brandId);
  const brandResponse = await GetBrandById(brandId);
  const productsResponse = await GetProductsByBrand(brandId);

  return (
    <BrandDetails brand={brandResponse.data} products={productsResponse.data} />
  );
}
