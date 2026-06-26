const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Save the browser binary inside the project folder so it gets deployed in the Render slug
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
