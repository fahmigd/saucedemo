// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",

  //object timeout
  timeout: 20 * 1000,

  //expectation timeout
  expect: {
    timeout: 20 * 1000,
  },

  reporter: "html",

  //browser used
  use: {
    baseURL: "https://www.saucedemo.com",
    browserName: "chromium",
    launchOptions: {
      args: ["--start-maximized"], // Buka browser dalam mode fullscreen
    },
    viewport: null, // Pastikan viewport mengikuti ukuran jendela

    headless: false,
  },
};
module.exports = config;
