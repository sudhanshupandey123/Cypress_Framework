
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class DragAndDrop extends SimpleUIElement {

  dragAndDrop(sourceLocator, targetLocator) {

    cy.xpath(sourceLocator).then($source => {
      cy.xpath(targetLocator).then($target => {
        cy.wrap($source).drag($target);
        cy.wrap($target).find($source).should('exist');
      });
    });
  }
}

module.exports = { DragAndDrop };
