const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './content/browser',
  workers: 1,
  timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:8879', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1280, height: 800 } } },
    { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'python3 server.py 8879',
    url: 'http://127.0.0.1:8879',
    reuseExistingServer: false,
  },
});
