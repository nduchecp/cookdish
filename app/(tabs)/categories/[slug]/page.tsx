import Link from "next/link";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { getTheMealDBRecipesByCategory } from "@/lib/api/themealdb";
import { NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");

  let recipes = [];
  if (slug.toLowerCase().includes("nigerian-soup") || slug.toLowerCase().includes("soup")) {
    recipes = NIGERIAN_LOCAL_DISHES.filter(
      (r) => r.category === "Nigerian Soups" || r.title.toLowerCase().includes("soup")
    );
  } else if (slug.toLowerCase() === "nigerian" || slug.toLowerCase() === "african") {
    recipes = NIGERIAN_LOCAL_DISHES;
  } else {
    recipes = await getTheMealDBRecipesByCategory(categoryName);
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/categories"
          className="p-2 rounded-xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F1D1B]">{categoryName} Recipes</h1>
          <p className="text-[#6E6B68] text-sm">Showing {recipes.length} authentic dishes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#EFE6DD] shadow-sm hover:shadow-md transition-all group flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#F3EAE1]">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 left-3 bg-[#1F1D1B]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                {recipe.category}
              </span>
              {recipe.area && (
                <span className="absolute top-3 left-3 bg-[#E8734A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {recipe.area}
                </span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-[#6E6B68] font-medium">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#1F1D1B]">{recipe.rating}</span>
                  <span>({recipe.reviewsCount})</span>
                </div>
                <Link href={`/recipe/${recipe.source}/${recipe.id}`}>
                  <h4 className="text-lg font-bold text-[#1F1D1B] group-hover:text-[#E8734A] transition-colors line-clamp-1">
                    {recipe.title}
                  </h4>
                </Link>
              </div>

              <div className="flex justify-between items-center text-xs text-[#6E6B68] pt-2 border-t border-[#EFE6DD]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#E8734A]" />
                  <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                </div>
                <span className="font-semibold text-[#1F1D1B] px-2.5 py-0.5 bg-[#FDF6EF] rounded-md border border-[#EFE6DD]">
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
