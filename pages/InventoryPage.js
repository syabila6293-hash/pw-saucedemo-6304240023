// Page Object: halaman daftar produk
export class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

  // "Sauce Labs Backpack" -> "add-to-cart-sauce-labs-backpack"
  async addToCart(productName) {
    const slug = productName.replace(/\s+/g, '-').toLowerCase();
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async sortBy(value) {
    await this.sortSelect.selectOption(value); // az | za | lohi | hilo
  }

  async openCart() {
    await this.cartLink.click();
  }
}
