// Cypress equivalent for DragAndDrop class from Python
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class DragAndDrop extends SimpleUIElement {
  /**
   * Performs robust drag and drop from source to target locator (supports simple and complex cases).
   * Uses @4tw/cypress-drag-drop plugin for best compatibility.
   * Includes assertion to verify the source is now inside the target.
   * @param {string} sourceLocator - XPath for the source element
   * @param {string} targetLocator - XPath for the target element
   */
  dragAndDrop(sourceLocator, targetLocator) {
    // Support drag-and-drop using XPath selectors by resolving elements and using the plugin
    cy.xpath(sourceLocator).then($source => {
      cy.xpath(targetLocator).then($target => {
        cy.wrap($source).drag($target);
        // Assertion: source should now be inside target (optional, adjust as needed)
        cy.wrap($target).find($source).should('exist');
      });
    });
  }
}

module.exports = { DragAndDrop };
