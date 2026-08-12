const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// Helper to calculate CRC32 checksum for PNG chunks
function crc32(buf) {
  let c = 0xffffffff;
  const table = [];
  for (let n = 0; n < 256; n++) {
    let k = n;
    for (let m = 0; m < 8; m++) {
      k = k & 1 ? 0xedb88320 ^ (k >>> 1) : k >>> 1;
    }
    table[n] = k;
  }
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Generate valid binary PNG file buffer with solid orange color (#E8734A)
function generateSolidPng(width, height) {
  // 8-bit RGBA pixels: #E8734A (232, 115, 74, 255)
  const r = 232, g = 115, b = 74, a = 255;
  const rowSize = width * 4 + 1; // 1 filter byte per row
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize;
    rawData[rowStart] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const idx = rowStart + 1 + x * 4;
      rawData[idx] = r;
      rawData[idx + 1] = g;
      rawData[idx + 2] = b;
      rawData[idx + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Header Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);  // Bit depth
  ihdrData.writeUInt8(6, 9);  // Color type RGBA
  ihdrData.writeUInt8(0, 10); // Compression
  ihdrData.writeUInt8(0, 11); // Filter
  ihdrData.writeUInt8(0, 12); // Interlace

  const ihdrChunk = createChunk("IHDR", ihdrData);
  const idatChunk = createChunk("IDAT", compressedData);
  const iendChunk = createChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  const crcCalc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crcCalc, 0);
  return Buffer.concat([length, typeBuf, data, crcBuf]);
}

const publicDir = path.join(__dirname, "..", "public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate real valid binary PNG image files
fs.writeFileSync(path.join(publicDir, "icon-192.png"), generateSolidPng(192, 192));
fs.writeFileSync(path.join(publicDir, "icon-512.png"), generateSolidPng(512, 512));
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), generateSolidPng(180, 180));

// Also generate Web App Manifest JSON
const manifestContent = {
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
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

fs.writeFileSync(path.join(publicDir, "manifest.json"), JSON.stringify(manifestContent, null, 2));

console.log("Valid binary PNG PWA icons generated successfully!");
