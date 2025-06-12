// Add custom Cypress commands or setup here

require('cypress-grep')
require('cypress-xpath');
import '@4tw/cypress-drag-drop';
beforeEach(() => {
  // Example: clear cookies before each test
  cy.clearCookies();
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore errors from the application under test
  if (err.message.includes("Cannot read properties of undefined (reading 'msie')")) {
    return false; // prevents Cypress from failing the test
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore 'angular is not defined' errors from the application under test
  if (err.message.includes("angular is not defined")) {
    return false; // prevents Cypress from failing the test
  }
});

// afterEach(function () {
//   // Create a folder with date and time for each run and move the video log there
//   const dayjs = require('dayjs');
//   const fs = require('fs');
//   const path = require('path');

//   // Get current date-time string
//   const now = dayjs().format('YYYY-MM-DD_HH-mm-ss');
//   const runFolder = path.join('Temp_Folder', `run_${now}`);

//   // Create the folder if it doesn't exist
//   if (!fs.existsSync(runFolder)) {
//     fs.mkdirSync(runFolder, { recursive: true });
//   }

//   // Move all .mp4 files from videos/ to the new folder (except folders)
//   const videosDir = path.join('videos');
//   fs.readdirSync(videosDir).forEach(file => {
//     const filePath = path.join(videosDir, file);
//     if (fs.statSync(filePath).isFile() && file.endsWith('.mp4')) {
//       fs.renameSync(filePath, path.join(runFolder, file));
//     }
//   });
// });
