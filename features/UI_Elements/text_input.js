
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
   
    if (typeof text === 'string') {
      this.element.should('have.value', text);
    }
  }
}

module.exports = { TextInput };
