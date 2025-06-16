const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class DropDown extends SimpleUIElement {
  constructor(dropdownLocator, optionLocator, options = {}) {
    super(dropdownLocator, options);
    this.dropdownLocator = dropdownLocator;
    this.optionLocator = optionLocator;
    this.maxTime = options.maxTime || 10000;
    this.retry = options.retry || 3;
  }

  getValue() {
  return cy.xpath(this.dropdownLocator).invoke('text');
}
  selectValueFromDropdown(valueToSelect, validationLocator, validatePostCondition = false) {
    const optionSelector = this.optionLocator.replace('{value}', valueToSelect);
    let attempts = 0;
    const trySelect = () => {
      attempts++;
      cy.xpath(this.dropdownLocator, { timeout: this.maxTime }).click({ force: true });
      cy.xpath(optionSelector, { timeout: this.maxTime })
        .click({ force: true })
        .then(() => {
          if (validatePostCondition) {
            cy.xpath(validationLocator).invoke('text').should('eq', valueToSelect);
          }
        }, (err) => {
          
          if (attempts < this.retry) {
            Cypress.log({ name: 'DropDown', message: `Dropdown Option not available, retrying (${attempts})...` });
            cy.wait(500).then(trySelect);
          } else {
            throw new Error(`Dropdown option not available after ${this.retry} attempts: ${err.message}`);
          }
        });
    };
    trySelect();
  }
}

module.exports = { DropDown};
