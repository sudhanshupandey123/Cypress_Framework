// readpdf.js - JS/Cypress version of get_dynamic_data from readpdf.py
// Ported from Python to JavaScript for use in pdfRedaction and other utilities

/**
 * Extracts all dynamic date-like strings from the input text.
 * @param {string} text - The input string to search for dynamic data.
 * @returns {string[]} Array of matched dynamic data strings.
 */
function getDynamicData(text) {
  const allDates = [];
  const datePatterns = [
    /\d{2}-\w{3}-\d{4}\s+\d{6}/gi,
    /\w{3}-\d{4}\s+\d{6}/gi,
    /\d{2}-\w{3}-\d{4}/gi,
    /\d{2}-\w{3}-\d{2}/gi,
    /\d{4}\s+\d{6}/gi,
    /\d{2}-\w{3}-/gi,
    /\d{2}-\w{3}/gi,
    /[0-9]{2}/g,
    /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g,
    /[0-9]{2}\/[0-9]{2}\/[0-9]{2}/g
  ];
  for (const pattern of datePatterns) {
    const found = text.match(pattern);
    if (found) allDates.push(...found);
  }
  return allDates;
}

module.exports = { getDynamicData };
