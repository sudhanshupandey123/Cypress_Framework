// Cypress equivalent for variables.py
// Use this file to centralize timeouts, constants, and config for Cypress tests
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../../');

module.exports = {
  PROJECT_ROOT,
  DEFAULT_WAIT_TIME: 22000,
  MAX_WAIT_TIME: 10000,
  BROWSER_LAUNCH_TIME: 10000,
  PAGE_NAVIGATION_TIME: 50000,
  SLOW_MOTION_TIME: 600,
  ASSERT_TIMEOUT: 200000,
  DOWNLOAD_TIME: 60000,
  PAGE_LOAD_TIME: 300, // 5 MIN
  POLLING_TIME: 1800,
  COOKIE_VALIDITY: 200,
  WINDOW_SIZE: { width: 1890, height: 920 },
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
};
