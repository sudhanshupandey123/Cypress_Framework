// Cypress equivalent for Checkbox class from Python
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class Checkbox extends SimpleUIElement {
  constructor(selector, options = {}) {
    super(selector, options);
    this.validationSelector = options.validationSelector;
  }

  check() {
    this.setValue(true);
  }

  uncheck() {
    this.setValue(false);
  }

  getValue() {
    if (!this.validationSelector) {
      return this.element.should('be.checked');
    } else {
      return cy.xpath(this.validationSelector).should('be.checked');
    }
  }

  setValue(checked) {
    const el = this.validationSelector ? cy.xpath(this.validationSelector) : this.element;
    el.then($el => {
      const isChecked = $el.prop('checked');
      if (isChecked !== checked) {
        cy.wrap($el).click({force: true});
      }
      // Post-condition: ensure checked state
      if (checked) {
        cy.wrap($el).should('be.checked');
      } else {
        cy.wrap($el).should('not.be.checked');
      }
    });
  }
}

module.exports = { Checkbox };
