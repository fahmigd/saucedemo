class HeaderPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartIcon = page.locator("[data-test='shopping-cart-link']");
    this.shoppingCartBadge = page.locator("[data-test='shopping-cart-badge']");
  }

  async shoppingCartBadgeIsVisible() {
    return await this.shoppingCartBadge.isVisible();
  }

  async getShoppingCartBadgeCount() {
    const count = await this.shoppingCartBadge.textContent();
    return parseInt(count, 10);
  }
}

module.exports = { HeaderPage };
