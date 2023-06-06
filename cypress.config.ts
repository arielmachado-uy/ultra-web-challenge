import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "g5ecjv",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
  },

  setupNodeEvents(on: any, config: any) {},
});
