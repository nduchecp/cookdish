import { notFound } from "next/navigation";
import { getUnifiedRecipeById } from "@/lib/api/recipes";
import CookingClientView from "./CookingClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CookingModePage({
  params,
}: {
  params: Promise<{ source: string; id: string }>;
}) {
  const { source, id } = await params;
  const recipe = await getUnifiedRecipeById(source, id);

  if (!recipe) {
    notFound();
  }

  return <CookingClientView recipe={recipe} source={source} id={id} />;
}
