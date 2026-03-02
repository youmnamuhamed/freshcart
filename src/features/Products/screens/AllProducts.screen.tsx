import AllProducts from "../components/AllProducts";
import { getProducts } from "../server/products.action";

export default async function AllProductsScreen() {
  const response = await getProducts();

  return <AllProducts products={response.data} />;
}
