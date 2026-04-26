// @ts-check
const { defineConfig } = require ('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = defineConfig({
  testDir: './tests',
  timeout: 40*1000, //40 secs. Default pw timeout is 30 secs
  expect: 
  {
    timeout: 40*1000,
  },
  reporter: 'html',
  use : {
    browserName: 'chromium',
    headless : false
  }

 
});

module.exports = config

