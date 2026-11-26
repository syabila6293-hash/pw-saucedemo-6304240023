import { test, expect } from './fixtures.js';

test.describe('Belanja & checkout', () => {
  test('tambah 2 produk ke keranjang', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('checkout end-to-end sampai selesai', async ({
    loggedIn, inventoryPage, cartPage, checkoutPage,
  }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await expect(cartPage.items).toHaveText(['Sauce Labs Backpack']);

    await cartPage.checkout();
    await checkoutPage.fillInformation({
      firstName: 'Budi', lastName: 'Santoso', postalCode: '28711',
    });
    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout gagal jika First Name kosong', async ({
    loggedIn, inventoryPage, cartPage, checkoutPage,
  }) => {
    await inventoryPage.addToCart('Sauce Labs Onesie');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation({ firstName: '', lastName: 'Santoso', postalCode: '28711' });
    await expect(checkoutPage.error).toHaveText('Error: First Name is required');
  });

  test('urutkan harga dari termurah', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const teks = await inventoryPage.itemPrices.allTextContents();   // ["$7.99", ...]
    const harga = teks.map((t) => parseFloat(t.replace('$', '')));
    const urut = [...harga].sort((a, b) => a - b);
    expect(harga).toEqual(urut);
  });
});
