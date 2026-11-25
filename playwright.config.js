import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  timeout: 30000,
  expect: { timeout: 8000 },
  use: {
    baseURL: 'http://127.0.0.1:4178/try-the-look/',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
      args: process.env.CI ? [] : ['--no-sandbox'],
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  webServer: {
    command: 'node scripts/build.mjs && node scripts/serve.mjs',
    url: 'http://127.0.0.1:4178/try-the-look/',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
