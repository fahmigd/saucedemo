class InventoryPage {
  constructor(page) {
    this.page = page;
    this.titlePage = page.locator("[data-test='title']");
    this.productNames = page.locator(".inventory_item_name");
    this.productImage = page.locator(".inventory_item_img");
    this.productDescription = page.locator(".inventory_item_desc");
    this.productPrice = page.locator(".inventory_item_price");
    this.productAddtoCartButton = page.locator(
      ".btn.btn_primary.btn_small.btn_inventory"
    );
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async goTo() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrice() {
    const productPriceText = await this.productPrice.allTextContents();
    return productPriceText.map((price) => parseFloat(price.replace("$", "")));
  }

  async getCount() {
    return await this.productNames.count();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async sortProductNamesAsc(productNameList) {
    const sortedAsc = await [...productNameList].sort((a, b) =>
      a.localeCompare(b)
    );
    return sortedAsc;
  }

  async sortProductNamesDesc(productNameList) {
    const sortedDesc = await [...productNameList].sort((a, b) =>
      b.localeCompare(a)
    );
    return sortedDesc;
  }

  async sortProductPriceAsc(productPriceList) {
    const sortedAsc = await [...productPriceList].sort((a, b) => a - b);
    return sortedAsc;
  }

  async sortProductPriceDesc(productPriceList) {
    const sortedDesc = await [...productPriceList].sort((a, b) => b - a);
    return sortedDesc;
  }
}

module.exports = { InventoryPage };
