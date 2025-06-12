// Cypress equivalent of SimpleUIElement class from Playwright/Python

class SimpleUIElement {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.maxTime = options.maxTime || 4000; // Default wait time in ms
  }

  get element() {
    return cy.xpath(this.selector, { timeout: this.maxTime });
  }

  get elements() {
    return cy.xpath(this.selector, { timeout: this.maxTime });
  }

  visible() {
    // Returns a Cypress chainable for visibility assertion
    return this.element.should('be.visible');
  }

  disappears() {
    // Waits for the element to be hidden
    return this.element.should('not.be.visible');
  }

  modifyElement(value, howToModify, postConditions = {}) {
    // howToModify should be a function that receives the value and performs the modification
    if (value !== undefined && value !== null) {
      howToModify(value);
    } else {
      howToModify();
    }
    // Post-conditions can be checked here if needed
    Object.entries(postConditions).forEach(([key, val]) => {
      if (key === 'checked') {
        this.element.should(val ? 'be.checked' : 'not.be.checked');
      } else if (key === 'toggle') {
        this.element.should(val ? 'have.attr' : 'not.have.attr', 'aria-checked', 'true');
      } else if (key === 'check_text') {
        this.element.should('have.value', val);
      } else {
        this.element.should('have.attr', key, val);
      }
    });
  }

  count() {
    // Returns a Cypress chainable for the number of elements
    return cy.xpath(this.selector, { timeout: this.maxTime }).its('length');
  }
}

module.exports = { SimpleUIElement };
