require('dotenv').config()
const { defineConfig, devices } = require('@playwright/test')

if (!process.env.TEST_MONGODB_URI) {
  throw new Error('TEST_MONGODB_URI is not set, refusing to run e2e tests against the real database')
}

module.exports = defineConfig({
  testDir: './e2e-tests',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3001/health',
    reuseExistingServer: false,
    timeout: 120 * 1000,
    env: {
      PORT: '3001',
      MONGODB_URI: process.env.TEST_MONGODB_URI,
    },
  },
})
