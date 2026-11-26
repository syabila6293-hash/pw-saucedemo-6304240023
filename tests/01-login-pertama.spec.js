import { test, expect } from '@playwright/test';

test('login berhasil dengan standard_user', async ({ page }) => {
  // Arrange: buka halaman login
  await page.goto('/');

  // Act: isi form lalu klik Login
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  // Assert: diarahkan ke halaman produk
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByTestId('title')).toHaveText('Products');
});

test('login gagal dengan password salah', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('salah');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error')).toContainText(
    'Username and password do not match'
  );
});
