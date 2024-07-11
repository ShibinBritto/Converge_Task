const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout:6000,
  defaultCommandTimeout:8000,
  retries:3,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://www.amazon.in"
  },
});
