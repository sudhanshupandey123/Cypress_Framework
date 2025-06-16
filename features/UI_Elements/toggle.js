
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class Toggle extends SimpleUIElement {
  constructor(selector, options = {}) {
    super(selector, options);
    this.validationSelector = options.validationSelector;
  }

  enable() {
    const el = this.validationSelector ? cy.xpath(this.validationSelector) : this.element;
    el.should('exist').should('be.visible');
    this.setValue(true);
  }

  disable() {
    const el = this.validationSelector ? cy.xpath(this.validationSelector) : this.element;
    el.should('exist').should('be.visible');
    el.click({ force: true });
  }

  toggle() {
    this.getValue().then(val => this.setValue(!val));
  }

  getValue() {
    const el = this.validationSelector ? cy.xpath(this.validationSelector) : this.element;
    
    return el.then($el => {
      if ($el.attr('aria-checked') !== undefined) {
        return $el.attr('aria-checked') === 'true';
      } else if ($el.prop('checked') !== undefined) {
        return $el.prop('checked') === true;
      } else if ($el.attr('value') !== undefined) {
        return $el.attr('value') === 'true';
      } else {
        
        return false;
      }
    });
  }

  setValue(checked) {
    const el = this.validationSelector ? cy.xpath(this.validationSelector) : this.element;
    el.should('exist').should('be.visible');
    this.getValue().then(isChecked => {
      if (isChecked !== checked) {
        el.click({ force: true });
      }
      
      el.then($el => {
        if ($el.attr('aria-checked') !== undefined) {
          cy.wrap($el).should('have.attr', 'aria-checked', checked ? 'true' : 'false');
        } else if ($el.prop('checked') !== undefined) {
          cy.wrap($el).should(checked ? 'be.checked' : 'not.be.checked');
        } else if ($el.attr('value') !== undefined) {
          cy.wrap($el).should('have.attr', 'value', checked ? 'true' : 'false');
        }
      });
    });
  }
}

module.exports = { Toggle };
