const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const websiteImagesDir = path.join(projectRoot, '../website/images');
const publicImagesDir = path.join(projectRoot, 'public/images');
const realImagesDir = path.join(publicImagesDir, 'real');
const tempDir = path.join(projectRoot, 'temp_real_images');

// 1. Map of Product ID -> Descriptive Ghost Image filename in website/images
const ghostMap = {
  1: "Noir Botanica Set.png",
  2: "Midnight Jardin Jacket.png",
  3: "Azure Bloom Set.png",
  4: "Soleil Soirée Dress.png",
  5: "Celeste Bloom Set.png",
  6: "Camellia Set.png",
  7: "Morning Iris Shirt.png",
  8: "Dune Whisper Set.png",
  9: "Bluebell Shirt.png",
  10: "Aurelia Dress.png",
  11: "Coral Bloom Shirt.png",
  12: "Aster Shirt.png",
  13: "Blush Mirage Set.png",
  14: "Éloise Lace Top.png",
  15: "Wildflower Blouse.png",
  16: "Willow Mist Set.png",
  17: "Rosalie Set.png"
};

// 2. Map of Product ID -> Current filename of the model photo on disk (real-XX.png)
const modelMap = {
  1: "real-17.png",
  2: "real-02.png",
  3: "real-03.png",
  4: "real-16.png",
  5: "real-05.png",
  6: "real-11.png",
  7: "real-07.png",
  8: "real-08.png",
  9: "real-12.png",
  10: "real-10.png",
  11: "real-09.png",
  12: "real-06.png",
  13: "real-04.png",
  14: "real-14.png",
  15: "real-13.png",
  16: "real-01.png",
  17: "real-15.png"
};

console.log("Remapping ghost mannequin images...");
for (let id = 1; id <= 17; id++) {
  const paddedId = String(id).padStart(2, '0');
  const sourceName = ghostMap[id];
  const sourcePath = path.join(websiteImagesDir, sourceName);
  const destPath = path.join(publicImagesDir, `ghost-${paddedId}.png`);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied Ghost ${paddedId}: ${sourceName} -> ghost-${paddedId}.png`);
  } else {
    console.error(`Error: Source ghost file not found: ${sourcePath}`);
  }
}

console.log("\nRemapping model images...");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Move current files to temp directory
for (let id = 1; id <= 17; id++) {
  const paddedId = String(id).padStart(2, '0');
  const oldPath = path.join(realImagesDir, `real-${paddedId}.png`);
  const tempPath = path.join(tempDir, `real-${paddedId}.png`);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, tempPath);
  }
}

// Copy back to correct product IDs
for (let id = 1; id <= 17; id++) {
  const paddedId = String(id).padStart(2, '0');
  const sourceTempName = modelMap[id];
  const tempSourcePath = path.join(tempDir, sourceTempName);
  const destPath = path.join(realImagesDir, `real-${paddedId}.png`);

  if (fs.existsSync(tempSourcePath)) {
    fs.renameSync(tempSourcePath, destPath);
    console.log(`Moved Model ${paddedId}: ${sourceTempName} -> real-${paddedId}.png`);
  } else {
    console.error(`Error: Temp model file not found: ${tempSourcePath}`);
  }
}

// Cleanup temp directory
fs.rmdirSync(tempDir);
console.log("\nRemap complete!");
