class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.backToProductButton = page.locator("[data-test='back-to-products']");
    this.productName = page.locator("[data-test='inventory-item-name']");
    this.productImage = page
      .locator(".inventory_details_img_container")
      .locator("img");
    this.productDescription = page.locator("[data-test='inventory-item-desc']");
    this.productPrice = page.locator("[data-test='inventory-item-price']");
    this.addToCartButton = page.locator("[data-test='add-to-cart']");
    this.removeFromCartButton = page.locator("[data-test='remove']");
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductImage() {
    return await this.productImage.getAttribute("src");
  }

  async getProductDescription() {
    return await this.productDescription.textContent();
  }

  async getProductPrice() {
    await this.productPrice.textContent();
  }

  async removeFromCartButtonIsVisible() {
    return await this.removeFromCartButton.isVisible();
  }

  async getRemoveFromCartButtonCount() {
    return await this.removeFromCartButton.count();
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  async clickRemoveFromCartButton() {
    await this.removeFromCartButton.click();
  }

  async clickBackToProductButton() {
    await this.backToProductButton.click();
  }
}

module.exports = { ProductDetailPage };
