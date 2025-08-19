class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.titlePage = page.locator("[data-test='title']");
    this.continueShoppingButton = page.locator(
      "[data-test='continue-shopping']"
    );
    this.productName = page.locator("[data-test='inventory-item-name']");
    this.productDescription = page.locator("[data-test='inventory-item-desc']");
    this.productPrice = page.locator("[data-test='inventory-item-price']");
    this.addToCartButton = page.locator("[data-test='add-to-cart']");
    this.removeFromCartButton = page.locator(
      ".btn.btn_secondary.btn_small.btn_inventory "
    );
  }

  async getProductName(i) {
    return await this.productName.nth(i).textContent();
  }

  async getProductDescription(i) {
    return await this.productDescription.nth(i).textContent();
  }

  async getProductPrice(i) {
    await this.productPrice.nth(i).textContent();
  }

  async getProductNameList() {
    return await this.productName.allTextContents();
  }
}

module.exports = { ShoppingCartPage };
