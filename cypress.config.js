const fs = require('fs');
const path = require('path');

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

const envPath = path.resolve(__dirname, 'cypress.env.json');
const envVars = JSON.parse(fs.readFileSync(envPath, 'utf8'));

const viewportWidth = envVars.viewportWidth; 
const viewportHeight = envVars.viewportHeight;

module.exports = defineConfig({
  e2e: {
      viewportWidth,
      viewportHeight,
    video: true,
    videosFolder: 'videos',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      // Add this block for file download/rename support
      on('task', {
        findNewestFile(downloadFolder) {
          const fs = require('fs');
          const path = require('path');
          const files = fs.readdirSync(downloadFolder)
            .map(name => ({
              name,
              time: fs.statSync(path.join(downloadFolder, name)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);
          return files.length > 0 ? files[0].name : null;
        },
        renameNewestFile({ downloadFolder, expectedFileName }) {
          const fs = require('fs');
          const path = require('path');
          const files = fs.readdirSync(downloadFolder)
            .map(name => ({
              name,
              time: fs.statSync(path.join(downloadFolder, name)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);
          if (files.length === 0) return null;
          const oldPath = path.join(downloadFolder, files[0].name);
          const newPath = path.join(downloadFolder, expectedFileName);
          if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
          }
          return newPath;
        }
      });
      return config;
    },
    specPattern: 'features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    stepDefinitions: [
      'cypress/e2e/step_definitions/**/*.js',
      'features/steps/**/*.js'
    ]
  },
});
