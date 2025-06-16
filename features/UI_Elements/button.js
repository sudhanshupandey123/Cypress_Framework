
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class Button extends SimpleUIElement {
  async click(retries = 5) {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        await this.element.click();
        return;
      } catch (err) {
        lastError = err;
        await new Promise(res => setTimeout(res, 250));
      }
    }
    throw lastError;
  }
}

module.exports = { Button };
