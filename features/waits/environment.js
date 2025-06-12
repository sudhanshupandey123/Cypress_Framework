// Cypress environment setup for global hooks and custom commands
// Place this in cypress/support/environment.js and import in e2e.js

const { User } = require('../../cypress/support/user');
let user;

// beforeEach/afterEach hooks for scenario setup/teardown
beforeEach(() => {
  // Example: Set viewport, clear cookies, etc.
  cy.viewport(Cypress.env('VIEWPORT_WIDTH') || 1280, Cypress.env('VIEWPORT_HEIGHT') || 720);
  cy.clearCookies();
  cy.clearLocalStorage();
  // Create a global user object for use in tests
  user = new User(Cypress.env('APPLICATION_USERNAME'), Cypress.env('APPLICATION_PASSWORD'));
  Cypress.env('user', user); // Store in Cypress.env for global access
});

afterEach(function () {
  // Always record a video after each test, regardless of pass or fail
  const testTitle = this.currentTest && this.currentTest.title ? this.currentTest.title.replace(/[^a-zA-Z0-9-_]/g, '_') : 'unknown_test';
  // Print error to console if test fails
  if (this.currentTest && this.currentTest.state === 'failed') {
    // Print the error message and stack trace if available
    if (this.currentTest.err) {
      // eslint-disable-next-line no-console
      console.error(`Test failed: ${testTitle}\nError: ${this.currentTest.err.message}\nStack: ${this.currentTest.err.stack}`);
    } else {
      // eslint-disable-next-line no-console
      console.error(`Test failed: ${testTitle}`);
    }
    cy.screenshot(`failure-${testTitle}`);
  }
});

// Example: Custom command for login (replace with your actual login logic)
Cypress.Commands.add('login', (username, password, host = 'Desktop') => {
  const config = require('../../cypress.env.json');
  cy.visit(config[host.toUpperCase() + '_APP_URL'] || '/');
  cy.get('button:contains("Login")').click({ force: true });
  cy.get('#email').type(username);
  cy.get('button:contains("Continue")').click();
  cy.get('#password').type(password);
  cy.get('button:contains("Sign in")').click();
  cy.get('.name', { timeout: 10000 }).should('be.visible');
});

// Example: Custom command for setting cookies (if needed)
Cypress.Commands.add('setSessionCookie', (cookieName, cookieValue) => {
  cy.setCookie(cookieName, cookieValue);
});

// Add more setup/teardown logic as needed for your app

module.exports = { user };
