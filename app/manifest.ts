import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CookDish — Simple Culinary Recipes",
    short_name: "CookDish",
    description: "Discover, plan, and cook authentic Nigerian & global recipes with step-by-step guidance.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF6EF",
    theme_color: "#E8734A",
    orientation: "portrait",
    categories: ["food", "lifestyle", "utilities"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
