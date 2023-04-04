const {
  defineConfig
} = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: true,
    videoUploadOnPasses: true,
    viewportHeight: 1080,
    viewportWidth: 1500,

    // global variables can import to other files
    env: {
      email: Math.random().toString(36).substring(2),// this code is to provide random string
      nonUIPassword: "Password1"
    }
  }
});