// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000, //default is 30 seconds
  expect: {
    timeout: 10 * 1000
  },

  use: {
    baseURL: 'https://automationexercise.com',
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    testIdAttribute: 'data-qa'
  },

  reporter: [['html', { open: 'after-failure' }], ['list'],
           //  ['json', { outputFile: 'test-results.json' }]
            ],
});
module.exports = config;

