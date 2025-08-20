class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.titlePage = page.locator("[data-test='title']");
    this.continueShoppingButton = page.locator(
      "[data-test='continue-shopping']"
    );
    this.qtyLabel = page.locator("[data-test='cart-quantity-label']");
    this.descriptionLabel = page.locator("[data-test='cart-desc-label']");
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.productName = page.locator("[data-test='inventory-item-name']");
    this.productDescription = page.locator("[data-test='inventory-item-desc']");
    this.productPrice = page.locator("[data-test='inventory-item-price']");
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

  async getProductDescriptionList() {
    return await this.productDescription.allTextContents();
  }

  async getProductPriceList() {
    const productPriceTextList = await this.productPrice.allTextContents();
    return productPriceTextList.map((price) =>
      parseFloat(price.replace("$", ""))
    );
  }

  async getCount() {
    return await this.productName.count();
  }

  async clickProductName(i) {
    await this.productName.nth(i).click();
  }

  async clickRemoveFromCartButton(i) {
    await this.removeFromCartButton.nth(i).click();
  }
}

module.exports = { ShoppingCartPage };
