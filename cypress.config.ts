const { defineConfig } = require("cypress");

export default defineConfig({
  projectId: "g5ecjv",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://www.saucedemo.com/", 
  },

  async setupNodeEvents(on: any, config: any) {
    return require("./cypress/support/e2e.ts")(on, config);
  },
});
