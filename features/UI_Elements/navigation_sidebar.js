// Cypress equivalent for NavigationSidebar class from Python
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

const OPEN_SIDEBAR = '.anticon-menu-unfold';
const SIDEBAR = '.side-menu';

class NavigationSidebar extends SimpleUIElement {
  constructor(options = {}) {
    super(OPEN_SIDEBAR, options);
    this.sidebar = new SimpleUIElement(SIDEBAR, options);
  }

  openSidebar() {
    // Log sidebar visibility (for debugging)
    this.sidebar.element.should('exist').then($el => {
      const sidebarVisible = Cypress.$($el).is(':visible');
      cy.log(`Sidebar visible: ${sidebarVisible}`);
    });
    this.element.should('exist').then($el => {
      const openSidebarVisible = Cypress.$($el).is(':visible');
      cy.log(`Open sidebar button visible: ${openSidebarVisible}`);
    });
    this.sidebar.element.should('not.be.visible');
    this.element.should('be.visible').click();
    this.sidebar.element.should('be.visible');
  }

  closeSidebar() {
    this.sidebar.element.should('be.visible');
    // Click on the body to close the sidebar
    cy.get('body').click();
    this.sidebar.element.should('not.be.visible');
  }
}

module.exports = { NavigationSidebar };
