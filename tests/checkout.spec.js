
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
    await checkoutPage.fillInformation({
      firstName: '', lastName: 'Santoso', postalCode: '28711',
    });
    await expect(checkoutPage.error).toHaveText('Error: First Name is required');
  });

  test('urutkan harga dari termurah', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const teks = await inventoryPage.itemPrices.allTextContents();
    const harga = teks.map((t) => parseFloat(t.replace('$', '')));
    const urut = [...harga].sort((a, b) => a - b);
    expect(harga).toEqual(urut);
  });

  // Tugas 1: hapus satu produk, badge tersisa 1
  test('hapus satu produk dari keranjang', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');

    await inventoryPage.removeFromCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  // Tugas 1: hapus produk terakhir, badge tidak tampil
  test('hapus produk terakhir dari keranjang', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');

    await inventoryPage.removeFromCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  // Tugas 1: urutkan nama produk dari Z ke A
  test('urutkan nama produk dari Z ke A', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.sortBy('za');

    const nama = await inventoryPage.itemNames.allTextContents();
    const urut = [...nama].sort((a, b) => b.localeCompare(a));

    expect(nama).toEqual(urut);
  });

  // Tugas 1: urutkan harga dari tertinggi ke terendah
  test('urutkan harga dari tertinggi ke terendah', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.sortBy('hilo');

    const teks = await inventoryPage.itemPrices.allTextContents();
    const harga = teks.map((t) => parseFloat(t.replace('$', '')));
    const urut = [...harga].sort((a, b) => b - a);

    expect(harga).toEqual(urut);
  });
});
