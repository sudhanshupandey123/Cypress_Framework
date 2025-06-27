// Cypress/Node.js equivalent for utils/env.py
const path = require('path');
const fs = require('fs');

const config = require('../cypress.env.json');
const { PROJECT_ROOT } = require('../features/waits/variables');

function loadEnv() {
}

function getFromEnv(name, required = true) {
  let value = Cypress.env(name);
  if (value === undefined) value = config[name];
  if (required && (value === undefined || value === null || value === '')) {
    throw new Error(`No ${name} environment variable found.`);
  }
  return value;
}

function getWindowSize() {
  const windowSize = getFromEnv('WINDOW_SIZE');
  if (typeof windowSize === 'string') {
    // Try to parse as JSON or split as width,height
    try {
      const parsed = JSON.parse(windowSize);
      return parsed;
    } catch {
      const [width, height] = windowSize.split(/[x,]/).map(Number);
      if (!width || !height) throw new Error('Invalid window size');
      return { width, height };
    }
  }
  return windowSize;
}

function isTruthy(boolAsString) {
  if (typeof boolAsString === 'boolean') return boolAsString;
  return String(boolAsString).toLowerCase() === 'true';
}

module.exports = { loadEnv, getFromEnv, getWindowSize, isTruthy };
