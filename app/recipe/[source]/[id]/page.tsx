import { notFound } from "next/navigation";
import { getUnifiedRecipeById } from "@/lib/api/recipes";
import RecipeClientView from "./RecipeClientView";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ source: string; id: string }>;
}) {
  const { source, id } = await params;
  const recipe = await getUnifiedRecipeById(source, id);

  if (!recipe) {
    notFound();
  }

  return <RecipeClientView recipe={recipe} source={source} id={id} />;
}
