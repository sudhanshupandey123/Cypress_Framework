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

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore "Assignment to constant variable" errors from the app under test
  if (err.message && err.message.includes('Assignment to constant variable')) {
    return false; // prevents Cypress from failing the test
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore errors about reading 'fn' of undefined from the app under test
  if (err.message && err.message.includes("Cannot read properties of undefined (reading 'fn')")) {
    return false; // prevents Cypress from failing the test
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore errors about $ is not defined from the app under test
  if (err.message && err.message.includes('$ is not defined')) {
    return false; // prevents Cypress from failing the test
  }
});
