import SubCategories from "../Components/SubCategories";

interface Props {
  categoryId: string;
}

export default async function SubCategoriesScreen({ categoryId }: Props) {
  console.log("SCREEN RECEIVED:", categoryId);

  return <SubCategories categoryId={categoryId} />;
}
