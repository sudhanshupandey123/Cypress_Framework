// Cypress equivalent for DateTime class from Python
// Usage: new DateTime(selector).getDateTime(format)

class DateTime {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.maxTime = options.maxTime || 4000;
  }

  getDateTime(format = 'ddd DD/MM/YYYY HH:mm:ss A') {
    // format uses dayjs tokens (https://day.js.org/docs/en/display/format)
    // Requires dayjs to be installed as a dev dependency
    return cy.get(this.selector, { timeout: this.maxTime })
      .invoke('text')
      .then(text => {
        return dayjs(text.trim(), format);
      });
  }
}

module.exports = { DateTime };
