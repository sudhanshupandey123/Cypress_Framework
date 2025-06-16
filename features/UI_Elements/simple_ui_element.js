

class SimpleUIElement {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.maxTime = options.maxTime || 4000; 
  }

  get element() {
    return cy.xpath(this.selector, { timeout: this.maxTime });
  }

  get elements() {
    return cy.xpath(this.selector, { timeout: this.maxTime });
  }

  visible() {
    
    return this.element.should('be.visible');
  }

  disappears() {
    
    return this.element.should('not.be.visible');
  }

  modifyElement(value, howToModify, postConditions = {}) {
    
    if (value !== undefined && value !== null) {
      howToModify(value);
    } else {
      howToModify();
    }
    
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
    
    return cy.xpath(this.selector, { timeout: this.maxTime }).its('length');
  }
}

module.exports = { SimpleUIElement };
