// Cypress equivalent for NavigationLink class from Python
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class NavigationLink extends SimpleUIElement {
  constructor(selector, options = {}) {
    super(selector, options);
    this.linkElement = new SimpleUIElement(selector, options);
  }

  isExpanded() {
    // Returns a Cypress chainable for aria-expanded check
    return this.element.invoke('attr', 'aria-expanded').then(val => val === 'true');
  }

  openMenu() {
    this.isExpanded().then(expanded => {
      if (!expanded) {
        this.element.click();
      }
    });
  }

  goTo() {
    this.element.click();
  }
}

module.exports = { NavigationLink };
