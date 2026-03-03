import AllProductsScreen from "@/features/Products/screens/AllProducts.screen";
import CategoryProductsScreen from "@/features/Products/screens/CategoryProducts.screen";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;

  if (category) {
    return <CategoryProductsScreen categoryId={category} />;
  }

  return <AllProductsScreen />;
}

