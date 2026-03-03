import AllProductsScreen from "@/features/Products/screens/AllProducts.screen";
import CategoryProductsScreen from "@/features/Products/screens/CategoryProducts.screen";
import SubcategoryProductsScreen from "@/features/Products/screens/SubcategoryProducts.screen";

interface Props {
  searchParams: Promise<{ category?: string; subcategory?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category, subcategory } = await searchParams;

  if (subcategory) return <SubcategoryProductsScreen subcategoryId={subcategory} />;
  if (category) return <CategoryProductsScreen categoryId={category} />;

  return <AllProductsScreen />;
}