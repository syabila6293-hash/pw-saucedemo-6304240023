
import { test, expect, PASSWORD } from './fixtures.js';

const users = [
  { username: 'standard_user' },
  { username: 'problem_user' },
];

for (const user of users) {
  test(`uji sorting dan checkout dengan ${user.username}`, async ({
    page, loginPage, inventoryPage, cartPage, checkoutPage,
  }) => {

    // Bug sorting pada problem_user memang diharapkan gagal
    test.fail(
      user.username === 'problem_user',
      'problem_user memiliki bug pada pengurutan harga dari termurah'
    );

    // Login menggunakan akun yang sedang diuji
    await loginPage.goto();
    await loginPage.login(user.username, PASSWORD);

    await expect(page).toHaveURL(/inventory\.html/);

    // Urutkan harga dari termurah
    await inventoryPage.sortBy('lohi');

    const teksHarga = await inventoryPage.itemPrices.allTextContents();
    const harga = teksHarga.map((t) => parseFloat(t.replace('$', '')));
    const hargaTerurut = [...harga].sort((a, b) => a - b);

    expect(harga).toEqual(hargaTerurut);

    // Tambahkan produk pertama setelah pengurutan
    const namaProduk = await inventoryPage.itemNames.first().textContent();
    await inventoryPage.addToCart(namaProduk.trim());

    // Buka keranjang dan lanjut checkout
    await inventoryPage.openCart();
    await cartPage.checkout();

    // Isi informasi checkout sampai halaman Overview
    await checkoutPage.fillInformation({
      firstName: 'Budi',
      lastName: 'Santoso',
      postalCode: '28711',
    });

    await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
  });
}
