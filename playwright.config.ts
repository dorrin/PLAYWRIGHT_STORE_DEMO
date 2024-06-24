import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  outputDir: './test-results',
  /* Run tests in files in parallel */
  fullyParallel: false,
  retries: 1,
  timeout: 50000,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',

  use: {

    trace: 'on-first-retry',

    //SLOW mode
    //launchOptions:{
     //   slowMo:700,
   // } 
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 } 
       },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
