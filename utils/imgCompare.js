// Cypress/Node.js equivalent for utils/imgCompare.py
// Requires: npm install sharp pixelmatch
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pixelmatch = require('pixelmatch');

/**
 * Compare two PNG images and highlight differences.
 * @param {string} baselineFolder - Path to baseline images
 * @param {string} testFolder - Path to test images
 * @param {string} imageToCompare - Image filename (PNG)
 * @param {object} [fileCropSpecifications] - {Top, Bottom, Left, Right} as percentages (0-100)
 * @param {string} [outputDir] - Output directory for diff images
 * @returns {Promise<boolean>} - true if images are equal, false if different
 */
async function compareScreenshotsWithPixelmatch({
  baselineFolder,
  testFolder,
  imageToCompare,
  fileCropSpecifications = null,
  outputDir = 'PDF_compiler/screenshot_diff',
  tagName = 'default',
}) {
  if (!imageToCompare.endsWith('.png')) {
    throw new Error('Only PNG images are supported.');
  }
  const file1 = path.join(baselineFolder, imageToCompare);
  const file2 = path.join(testFolder, imageToCompare);
  if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
    throw new Error(`File ${imageToCompare} does not exist in both folders.`);
  }
  const img1 = sharp(file1);
  const img2 = sharp(file2);
  let [buf1, buf2] = await Promise.all([img1.png().toBuffer(), img2.png().toBuffer()]);
  let meta1 = await img1.metadata();
  let meta2 = await img2.metadata();
  // Optionally crop images
  if (fileCropSpecifications) {
    buf1 = await cropImageBuffer(buf1, meta1, fileCropSpecifications);
    buf2 = await cropImageBuffer(buf2, meta2, fileCropSpecifications);
    meta1 = await sharp(buf1).metadata();
    meta2 = await sharp(buf2).metadata();
  }
  // Resize to same height if needed
  const height = Math.min(meta1.height, meta2.height);
  const width = Math.min(meta1.width, meta2.width);
  buf1 = await sharp(buf1).resize(width, height).toBuffer();
  buf2 = await sharp(buf2).resize(width, height).toBuffer();
  // Compare
  const diff = Buffer.alloc(width * height * 4);
  const { PNG } = require('pngjs');
  const img1Png = PNG.sync.read(buf1);
  const img2Png = PNG.sync.read(buf2);
  const numDiffPixels = pixelmatch(img1Png.data, img2Png.data, diff, width, height, { threshold: 0.1 });
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (numDiffPixels > 0) {
    const diffPath = path.join(outputDir, `${imageToCompare.replace('.png', '')}_diff.png`);
    const outPng = new PNG({ width, height });
    outPng.data = diff;
    fs.writeFileSync(diffPath, PNG.sync.write(outPng));
    console.log(`Images (${imageToCompare}) are different, diff saved to ${diffPath}`);
    return false;
  } else {
    console.log(`Images (${imageToCompare}) are equal.`);
    return true;
  }
}

/**
 * Crop an image buffer using sharp and crop specifications.
 * @param {Buffer} buf - Image buffer
 * @param {object} meta - Image metadata
 * @param {object} crop - {Top, Bottom, Left, Right} as percentages (0-100)
 * @returns {Promise<Buffer>}
 */
async function cropImageBuffer(buf, meta, crop) {
  let top = 0, left = 0, width = meta.width, height = meta.height;
  if (crop.Top) top = Math.floor(meta.height * (crop.Top / 100));
  if (crop.Bottom) height = Math.floor(meta.height - meta.height * (crop.Bottom / 100)) - top;
  else height = meta.height - top;
  if (crop.Left) left = Math.floor(meta.width * (crop.Left / 100));
  if (crop.Right) width = Math.floor(meta.width - meta.width * (crop.Right / 100)) - left;
  else width = meta.width - left;
  return sharp(buf).extract({ left, top, width, height }).toBuffer();
}

module.exports = { compareScreenshotsWithPixelmatch };
