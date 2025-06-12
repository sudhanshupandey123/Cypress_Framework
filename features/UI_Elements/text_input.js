// Cypress equivalent for TextInput class from Python
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class TextInput extends SimpleUIElement {
  enterText(text) {
    this.setValue(text);
  }

  clear() {
    this.setValue('');
  }

  getValue() {
    return this.element.invoke('val');
  }

  areInputsDisabled() {
    // Returns true if any input in the set is disabled
    return this.elements.then($elements => {
      return Array.from($elements).some(el => el.disabled);
    });
  }

  isInputDisabled() {
    return this.element.should($el => {
      expect($el).to.have.prop('disabled', true);
    });
  }

  setValue(text) {
    this.element.clear().type(text || '');
    // Optionally, you can assert the value after typing
    if (typeof text === 'string') {
      this.element.should('have.value', text);
    }
  }
}

module.exports = { TextInput };
