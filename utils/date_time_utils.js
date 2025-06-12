// Cypress/Node.js equivalent for utils/date_time.py

// Loader animation selector (if needed in tests)
const LOADER_ANIMATION = ".text-center.modal-body";

// Timer function for measuring execution time of a callback
function timerFunc(fn) {
  return async function(...args) {
    const start = Date.now();
    const result = await fn.apply(this, args);
    const end = Date.now();
    // Optionally log: console.log(`Function ${fn.name} executed in ${(end - start) / 1000}s`);
    return result;
  };
}

// Get current datetime as string (format: DD-MMM-YYYY HHmmss)
function getDatetime() {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${pad(now.getDate())}-${months[now.getMonth()]}-${now.getFullYear()} ${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

module.exports = { LOADER_ANIMATION, timerFunc, getDatetime };
