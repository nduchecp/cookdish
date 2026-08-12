const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");

// Simple solid PNG buffer generator for PWA icons
function generatePngIconBuffer(size) {
  // SVG text that can be used directly or served
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${Math.floor(size * 0.22)}" fill="#E8734A"/>
    <g transform="translate(${size * 0.25}, ${size * 0.25}) scale(${size / 100})">
      <path d="M25 5C13.95 5 5 13.95 5 25C5 36.05 13.95 45 25 45C36.05 45 45 36.05 45 25C45 13.95 36.05 5 25 5ZM25 40C16.73 40 10 33.27 10 25C10 16.73 16.73 10 25 10C33.27 10 40 16.73 40 25C40 33.27 33.27 40 25 40Z" fill="#FFFFFF"/>
      <path d="M23 15H27V27H23V15ZM23 31H27V35H23V31Z" fill="#FFFFFF"/>
    </g>
  </svg>`;
  return svg;
}

fs.writeFileSync(path.join(publicDir, "icon-192.png"), generatePngIconBuffer(192));
fs.writeFileSync(path.join(publicDir, "icon-512.png"), generatePngIconBuffer(512));
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), generatePngIconBuffer(180));
fs.writeFileSync(path.join(publicDir, "manifest.json"), JSON.stringify({
  name: "CookDish — Simple Culinary Recipes",
  short_name: "CookDish",
  description: "Discover, plan, and cook authentic Nigerian & global recipes with step-by-step guidance.",
  start_url: "/",
  display: "standalone",
  background_color: "#FDF6EF",
  theme_color: "#E8734A",
  orientation: "portrait",
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/svg+xml",
      purpose: "any maskable"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/svg+xml",
      purpose: "any maskable"
    }
  ]
}, null, 2));

console.log("PWA manifest & icon resources generated successfully!");
