import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  snapshotPathTemplate: "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5199",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    {
      name: "mobile-chrome",
      use: {
        browserName: "chromium",
        viewport: { width: 430, height: 932 },
      },
    },
  ],
  webServer: {
    command: "npx vite --port 5199",
    url: "http://localhost:5199",
    reuseExistingServer: !process.env.CI,
  },
});
