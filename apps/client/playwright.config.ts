import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// ES Module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the port from environment variable or use the default 1420
const port = process.env.VITE_CLIENT_PORT || "1420";
const baseUrl = `http://localhost:${port}`;

// Define output directory path
const outputDir = path.join(__dirname, "test-results");
// Define snapshots directory
const snapshotsDir = path.join(__dirname, "e2e", "__snapshots__");

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: baseUrl,
    trace: "on",
    screenshot: "only-on-failure",
    actionTimeout: 15000,
  },
  // Set snapshot configuration for comparisons
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
    timeout: 10000,
  },
  // Set snapshots directory at project level
  snapshotDir: snapshotsDir,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* Test against mobile viewports */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
  webServer: {
    command: `node -e "if (require('fs').existsSync('${outputDir}')) { require('fs').rmSync('${outputDir}', { recursive: true, force: true }); console.log('Test results directory cleaned.'); }" && pnpm run dev`,
    url: baseUrl,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
  outputDir,
});
