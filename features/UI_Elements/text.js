
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

function getTextFromElement(element) {
  
  return element.then($el => {
    const el = $el[0];
    if (!el) return null;

    
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      return el.value;
    }
  
    if (el.hasAttribute('title') && el.getAttribute('title')) {
      return el.getAttribute('title');
    }
   
    if (el.textContent && el.textContent.trim() !== '') {
      return el.textContent.trim();
    }
   
    if (el.innerText && el.innerText.trim() !== '') {
      return el.innerText.trim();
    }
    return null;
  });
}

class Text extends SimpleUIElement {
  clear() {
    this.setValue('');
  }

  enterText(inputText, validatePostCondition, clearText = true) {
    this.validatePostCondition = validatePostCondition;
    this.clearText = clearText;
    this.setValue(inputText);
    if (validatePostCondition) {
      this.element.should('have.value', inputText);
    }
  }

  getTexts() {

    return this.elements.then($elements => {
      return Cypress._.map($elements, el => el.value || el.title || el.textContent || '');
    });
  }

  getText() {
    return getTextFromElement(this.element);
  }

  getValue() {
    return this.element.invoke('val');
  }

  areInputsDisabled() {
    return this.elements.then($elements => {
      return Array.from($elements).some(el => el.disabled);
    });
  }

  setValue(inputText) {
    if (this.clearText) {
      this.element.clear();
    }
    if (inputText) {
      this.element.type(inputText);
    }
    if (this.validatePostCondition) {
      this.element.should('have.value', inputText);
    }
  }


}

module.exports = { Text, getTextFromElement };
