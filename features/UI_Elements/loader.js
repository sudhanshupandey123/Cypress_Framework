// Cypress equivalent for Loader class from Python
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');

class Loader extends SimpleUIElement {
  constructor(options = {}) {
    super(LOADER, options);
  }

  getLoader() {
    return this.selector;
  }

  isVisible() {
    // Returns a Cypress chainable for visibility assertion
    return this.element.should('be.visible');
  }

  /**
   * Waits for the loader to disappear from the page within a timeout (default 5 min).
   * @param {string} loaderLocator - CSS or XPath selector for the loader element
   * @param {number} timeoutMs - Timeout in milliseconds (default: 300000 = 5 min)
   */
  static waitForLoaderToDisappear(loaderLocator, timeoutMs = 300000) {
    const isXPath = loaderLocator.startsWith('//') || loaderLocator.startsWith('(');
    const getLoader = () => isXPath ? cy.xpath(loaderLocator, { timeout: 1000 }) : cy.get(loaderLocator, { timeout: 1000 });
    const start = Date.now();
    let loaderGone = false;
    function waitLoop() {
      let elapsed = Date.now() - start;
      if (elapsed > timeoutMs) {
        throw new Error(`Loader did not disappear after ${timeoutMs / 1000 / 60} minutes`);
      }
      getLoader().then($el => {
        if ($el.length === 0 || !$el.is(':visible')) {
          loaderGone = true;
        }
      });
    }
    // Synchronous-like polling loop using Cypress commands
    function poll() {
      if (loaderGone) return;
      waitLoop();
      if (!loaderGone) {
        cy.wait(500).then(poll);
      }
    }
    poll();
  }
}

module.exports = { Loader };
