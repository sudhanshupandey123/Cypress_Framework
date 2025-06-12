// Cypress/Node.js equivalent for utils/network.py
// Add network logging to Cypress tests using cy.intercept

function addNetworkLogs() {
  // Log all requests and responses
  cy.intercept({ url: '**', middleware: true }, (req) => {
    console.log('>>', req.method, req.url);
    req.on('response', (res) => {
      console.log('<<', res.statusCode, req.url);
    });
  });
}

module.exports = { addNetworkLogs };
