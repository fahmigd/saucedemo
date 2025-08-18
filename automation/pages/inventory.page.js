class InventoryPage {
  constructor(page) {
    this.page = page;
    this.titlePage = page.locator("[data-test='title']");
    this.productName = page.locator(".inventory_item_name");
    this.productImage = page.locator(".inventory_item_img").locator("img");
    this.productDescription = page.locator(".inventory_item_desc");
    this.productPrice = page.locator(".inventory_item_price");
    this.addToCartButton = page.locator(
      ".btn.btn_primary.btn_small.btn_inventory"
    );
    this.removeFromCartButton = page.locator(
      ".btn.btn_secondary.btn_small.btn_inventory "
    );
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async goTo() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async getProductName(i) {
    return await this.productName.nth(i).textContent();
  }

  async getProductImage(i) {
    return await this.productImage.nth(i).getAttribute("src");
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

  async getProductPriceList() {
    const productPriceTextList = await this.productPrice.allTextContents();
    return productPriceTextList.map((price) =>
      parseFloat(price.replace("$", ""))
    );
  }

  async getCount() {
    return await this.productName.count();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async sortByProductNamesAsc(productNameList) {
    const sortedAsc = await [...productNameList].sort((a, b) =>
      a.localeCompare(b)
    );
    return sortedAsc;
  }

  async sortByProductNamesDesc(productNameList) {
    const sortedDesc = await [...productNameList].sort((a, b) =>
      b.localeCompare(a)
    );
    return sortedDesc;
  }

  async sortByProductPriceAsc(productPriceList) {
    const sortedAsc = await [...productPriceList].sort((a, b) => a - b);
    return sortedAsc;
  }

  async sortByProductPriceDesc(productPriceList) {
    const sortedDesc = await [...productPriceList].sort((a, b) => b - a);
    return sortedDesc;
  }

  async clickProductName(i) {
    await this.productName.nth(i).click();
  }

  async clickProductImage(i) {
    await this.productImage.nth(i).click();
  }

  async clickAddToCartButton(i) {
    await this.addToCartButton.nth(i).click();
  }

  async clickRemoveFromCartButton(i) {
    await this.removeFromCartButton.nth(i).click();
  }

  async getRemoveFromCartButtonCount() {
    return await this.removeFromCartButton.count();
  }
}

module.exports = { InventoryPage };
