const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class DropDown extends SimpleUIElement {
  /**
   * @param {string} dropdownLocator - Selector for the dropdown element
   * @param {string} optionLocator - Selector for the dropdown option element(s), use a template string with {value} for dynamic value
   * @param {object} options - { maxTime, retry }
   */
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

  /**
   * Selects a value from the dropdown, with retry logic and optional post-condition validation.
   * @param {string} valueToSelect - The visible text of the option to select
   * @param {boolean} validatePostCondition - Whether to validate the selection
   */
  selectValueFromDropdown(valueToSelect, validatePostCondition = false) {
  const optionSelector = this.optionLocator.replace('{value}', valueToSelect);
  let attempts = 0;
  const trySelect = () => {
    attempts++;
    cy.xpath(this.dropdownLocator, { timeout: this.maxTime }).click({ force: true });
    cy.xpath(optionSelector, { timeout: this.maxTime })
      .click({ force: true })
      .then(() => {
        if (validatePostCondition) {
          this.getValue().should('eq', valueToSelect);
        }
      }, (err) => {
        // This is the only way to catch Cypress command errors
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
