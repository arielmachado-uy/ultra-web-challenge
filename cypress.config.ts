const { defineConfig } = require("cypress");

export default defineConfig({
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    baseUrl: "https://www.saucedemo.com",
  },

  async setupNodeEvents(on: any, config: any) {
    return require("./cypress/support/e2e.ts")(on, config);
  },
});
