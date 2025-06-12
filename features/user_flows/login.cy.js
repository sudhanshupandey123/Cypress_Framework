// Sample login test migrated from Behave/Playwright to Cypress

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/'); // Update with actual login page URL if needed
  });

  it('should log in with correct credentials', () => {
    cy.get('input[name="username"]').type(Cypress.env('USERNAME'));
    cy.get('input[name="password"]').type(Cypress.env('PASSWORD'));
    cy.get('button[type="submit"]').click();
    // Add assertion for successful login
    cy.contains('Dashboard').should('be.visible');
  });

  it('should show error with incorrect credentials', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    // Add assertion for error message
    cy.contains('Invalid username or password').should('be.visible');
  });
});
