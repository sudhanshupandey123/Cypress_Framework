// Cypress/Node.js equivalent for utils/logger.py
const fs = require('fs');
const path = require('path');

// Log file path (relative to project root)
const LOG_PATH = path.join(__dirname, '../../reports/behave.log');

function sanitizeIdentifier(identifier) {
  // Remove illegal characters for file access
  return identifier.replace(/[\/. ]/g, '');
}

function logWebpageState(filename, htmlContent, screenshotBuffer) {
  // Save HTML and screenshot to disk for debugging
  const sanitizedFilename = sanitizeIdentifier(filename);
  const location = process.env.SCREENSHOT_BASE_PATH || path.join(__dirname, '../../results/');
  if (!fs.existsSync(location)) {
    fs.mkdirSync(location, { recursive: true });
  }
  fs.writeFileSync(path.join(location, `html_${sanitizedFilename}.txt`), htmlContent);
  fs.writeFileSync(path.join(location, `${sanitizedFilename}.png`), screenshotBuffer);
}

function logMessage(message, level = 'info') {
  // Simple log to file
  const timestamp = new Date().toISOString();
  const logLine = `${timestamp} [${level.toUpperCase()}]  ${message}\n`;
  fs.appendFileSync(LOG_PATH, logLine);
}

module.exports = {
  LOG_PATH,
  sanitizeIdentifier,
  logWebpageState,
  logMessage,
};
