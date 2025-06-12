

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
      viewportWidth: 1920,
      viewportHeight: 1080,
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
