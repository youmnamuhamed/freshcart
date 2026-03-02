import SubCategoriesScreen from "@/features/Categories/screens/SubCategories.screen";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SubCategoriesPage({ params }: Props) {
  const { id } = await params;

  return <SubCategoriesScreen categoryId={id} />;
}
