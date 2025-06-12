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
      return config;
    },
    specPattern: 'features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    // Add this line:
    stepDefinitions: [
      'cypress/e2e/step_definitions/**/*.js',
      'features/steps/**/*.js'
    ]
  },
});
