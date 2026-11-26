import { test, expect, PASSWORD } from './fixtures.js';

test.describe('Login', () => {
  test('standard_user berhasil login', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  // Data-driven test: satu skenario, banyak data
  const kasusGagal = [
    { user: 'locked_out_user', pass: PASSWORD, pesan: 'Sorry, this user has been locked out.' },
    { user: 'standard_user', pass: 'salah', pesan: 'Username and password do not match' },
    { user: '', pass: PASSWORD, pesan: 'Username is required' },
    { user: 'standard_user', pass: '', pesan: 'Password is required' },
  ];

  for (const k of kasusGagal) {
    test(`login gagal: "${k.user || '(kosong)'}" -> ${k.pesan}`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(k.user, k.pass);
      await expect(loginPage.error).toContainText(k.pesan);
    });
  }
});
