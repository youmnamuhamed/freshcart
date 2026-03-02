import Brands from "../Components/Brands";
import { GetAllBrands } from "../server/brands.action";

export default async function BrandsScreen() {
  const brandsResponse = await GetAllBrands();

  return <Brands brands={brandsResponse.data} />;
}