
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class Collapse extends SimpleUIElement {
  expand() {
    this.setValue(true);
  }

  collapse() {
    this.setValue(false);
  }

  getValue() {
    return this.element.should('have.attr', 'aria-expanded', 'true');
  }

  setValue(expand) {
    const attributeValue = expand ? 'true' : 'false';
    this.element.invoke('attr', 'aria-expanded').then(current => {
      if (current !== attributeValue) {
        this.element.click();
      }
      this.element.should('have.attr', 'aria-expanded', attributeValue);
    });
  }
}

module.exports = { Collapse };
