// Custom fixture: menyiapkan Page Object & user yang sudah login
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

// Password dibaca dari environment (GitHub Secret di CI), fallback untuk lokal
export const PASSWORD = process.env.SAUCE_PASSWORD || 'secret_sauce';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  // Fixture "loggedIn": login otomatis sebelum test dijalankan
  loggedIn: async ({ loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login('standard_user', PASSWORD);
    await use(true);
  },
});

export { expect };
