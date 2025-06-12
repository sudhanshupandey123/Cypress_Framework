// Cypress/Node.js equivalent for utils/pdf.py
// Requires: npm install pdf2pic fs-extra
const path = require('path');
const fs = require('fs-extra');
const { fromPath } = require('pdf2pic');
const { compareScreenshotsWithPixelmatch } = require('../cypress/support/imgCompare');
const { PROJECT_ROOT } = require('../features/waits/variables');

async function convertPdfToImage({ tagName, inputPdfFile, outputFormat = 'png' }) {
  const fileName = inputPdfFile.split('.')[0];
  const pdfConvertOutputDirectory = path.join(PROJECT_ROOT, `PDF_compiler/pdf_files/${tagName}/out/${fileName}`);
  await fs.remove(pdfConvertOutputDirectory);
  await fs.ensureDir(pdfConvertOutputDirectory);
  const pdfPath = path.join(PROJECT_ROOT, `PDF_compiler/pdf_files/${tagName}/${inputPdfFile}`);
  const converter = fromPath(pdfPath, {
    density: 200,
    saveFilename: fileName,
    savePath: pdfConvertOutputDirectory,
    format: outputFormat,
    width: 1200,
    height: 1600,
  });
  const totalPages = await converter.info().then(info => info.numpages);
  for (let i = 1; i <= totalPages; i++) {
    await converter(i);
  }
  return pdfConvertOutputDirectory;
}

async function comparePdfFile({ tagName, baselineFolder, testFolder, fileCropSpecifications = null }) {
  const baselineDirectory = path.join(PROJECT_ROOT, `PDF_compiler/pdf_files/${tagName}/baseline/${baselineFolder}`);
  const testDirectory = path.join(PROJECT_ROOT, `PDF_compiler/pdf_files/${tagName}/out/${testFolder}`);
  const dirList = await fs.readdir(baselineDirectory);
  const testList = await fs.readdir(testDirectory);
  if (dirList.length !== testList.length) {
    throw new Error('Downloaded PDF does not have equal pages as baseline PDF');
  }
  for (const image of dirList) {
    await compareScreenshotsWithPixelmatch({
      baselineFolder: baselineDirectory,
      testFolder: testDirectory,
      imageToCompare: image,
      fileCropSpecifications,
      outputDir: path.join(PROJECT_ROOT, `PDF_compiler/screenshot_diff/compresult_${tagName}`),
      tagName,
    });
  }
}

async function comparePdfWithBaseline({ tagName, filename, fileCropSpecifications = null, featureTags = [], scenarioTags = [] }) {
  const fileName = filename.split('.')[0];
  await convertPdfToImage({ tagName, inputPdfFile: filename, outputFormat: 'png' });
  if (featureTags.includes('baseline') || scenarioTags.includes('baseline')) {
    // Baseline created, no comparison performed
    return;
  } else {
    await comparePdfFile({ tagName, baselineFolder: fileName, testFolder: fileName, fileCropSpecifications });
    const diffDir = path.join(PROJECT_ROOT, `PDF_compiler/screenshot_diff/compresult_${tagName}`);
    if (await fs.readdir(diffDir).then(list => list.length > 0)) {
      throw new Error('Downloaded PDF is not same as the baseline PDF');
    }
  }
}

module.exports = { convertPdfToImage, comparePdfFile, comparePdfWithBaseline };
