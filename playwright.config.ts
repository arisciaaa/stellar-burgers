import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/constructor.pl.tsx',

  use: {
    baseURL: 'http://localhost:4000'
  },

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4000',
    reuseExistingServer: true,
    timeout: 120000
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
