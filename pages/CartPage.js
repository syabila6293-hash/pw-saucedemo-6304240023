// Page Object: halaman keranjang
export class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
