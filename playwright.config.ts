// Tests e2e y de accesibilidad contra la build estática (astro preview).
// Local: Chrome instalado (canal "chrome"). CI: Chromium, WebKit y Firefox de Playwright.
import { defineConfig, devices } from '@playwright/test';

const CI = Boolean(process.env.CI);
const PUERTO = 4322;
const BASE = `http://127.0.0.1:${PUERTO}/grupobarsol/`;
const canal = CI ? {} : { channel: 'chrome' as const };

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `npx astro preview --port ${PUERTO} --host 127.0.0.1`,
    url: BASE,
    reuseExistingServer: !CI,
    timeout: 60_000,
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], ...canal } },
    { name: 'movil', use: { ...devices['Pixel 7'], ...canal } },
    ...(CI
      ? [
          { name: 'webkit-movil', use: { ...devices['iPhone 15'] } },
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        ]
      : []),
  ],
});
