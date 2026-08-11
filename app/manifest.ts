import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CookDish — Recipe & Kitchen Studio",
    short_name: "CookDish",
    description: "Discover, save, plan, and cook 50+ authentic Nigerian & global recipes.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF6EF",
    theme_color: "#E8734A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
