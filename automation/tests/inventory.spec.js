const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { InventoryPage } = require("../pages/inventory.page");
const { ProductDetailPage } = require("../pages/product-detail.page");
const { HeaderPage } = require("../pages/components/header.page");
const { validUser } = require("../data/login.data");
const { sort } = require("../data/product.data");

test.describe("Inventory Feature", () => {
  let loginPage;
  let inventoryPage;
  let productDetailPage;
  let headerPage;
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    headerPage = new HeaderPage(page);

    await loginPage.goTo();
    await loginPage.login(validUser.username, validUser.password);
    await expect(inventoryPage.titlePage).toHaveText("Products");
    const count = await inventoryPage.getCount();
    for (let i = 0; i < count; i++) {
      await expect(inventoryPage.productName.nth(i)).toBeVisible();
      await expect(inventoryPage.productImage.nth(i)).toBeVisible();
      await expect(inventoryPage.productDescription.nth(i)).toBeVisible();
      await expect(inventoryPage.productPrice.nth(i)).toBeVisible();
      await expect(inventoryPage.addToCartButton.nth(i)).toBeVisible();
    }
    await expect(page.url()).toContain("/inventory.html");
  });

  test("SD-10 Verify sorting products by Name (A to Z)", async () => {
    await inventoryPage.sortBy(sort.nameAsc);
    const productNameList = await inventoryPage.getProductNameList();
    const productNameListAsc = await inventoryPage.sortByProductNamesAsc(
      productNameList
    );
    await expect(productNameList).toEqual(productNameListAsc);
  });

  test("SD-11 Verify sorting products by Name (Z to A)", async () => {
    await inventoryPage.sortBy(sort.nameDesc);
    const productNameList = await inventoryPage.getProductNameList();
    const productNameListDesc = await inventoryPage.sortByProductNamesDesc(
      productNameList
    );
    await expect(productNameList).toEqual(productNameListDesc);
  });

  test("SD-12 Verify sorting products by Price (low to high)", async () => {
    await inventoryPage.sortBy(sort.priceAsc);
    const productPriceList = await inventoryPage.getProductPriceList();
    const productPriceListAsc = await inventoryPage.sortByProductPriceAsc(
      productPriceList
    );
    await expect(productPriceList).toEqual(productPriceListAsc);
  });

  test("SD-13 Verify sorting products by Price (high to low)", async () => {
    await inventoryPage.sortBy(sort.priceDesc);
    const productPriceList = await inventoryPage.getProductPriceList();
    const productPriceListDesc = await inventoryPage.sortByProductPriceDesc(
      productPriceList
    );
    await expect(productPriceList).toEqual(productPriceListDesc);
  });

  test("SD-14 Verify clicking product name navigates to details", async () => {
    await inventoryPage.goTo();
    let i = 0;
    const productNameFromList = await inventoryPage.getProductName(i);
    const productImageFromList = await inventoryPage.getProductImage(i);
    const productDescriptionFromList =
      await inventoryPage.getProductDescription(i);
    const productPriceFromList = await inventoryPage.getProductPrice(i);

    await inventoryPage.clickProductName(i);
    await expect(productDetailPage.backToProductButton).toBeVisible();

    const productNameFromDetail = await productDetailPage.getProductName();
    const productImageFromDetail = await productDetailPage.getProductImage();
    const productDescriptionFromDetail =
      await productDetailPage.getProductDescription();
    const productPriceFromDetail = await productDetailPage.getProductPrice();

    await expect(productNameFromList).toBe(productNameFromDetail);
    await expect(productImageFromList).toBe(productImageFromDetail);
    await expect(productDescriptionFromList).toBe(productDescriptionFromDetail);
    await expect(productPriceFromList).toBe(productPriceFromDetail);
  });

  test("SD-15 Verify clicking product image navigates to details", async () => {
    await inventoryPage.goTo();
    let i = 1;
    const productNameFromList = await inventoryPage.getProductName(i);
    const productImageFromList = await inventoryPage.getProductImage(i);
    const productDescriptionFromList =
      await inventoryPage.getProductDescription(i);
    const productPriceFromList = await inventoryPage.getProductPrice(i);

    await inventoryPage.clickProductName(i);
    await expect(productDetailPage.backToProductButton).toBeVisible();

    const productNameFromDetail = await productDetailPage.getProductName();
    const productImageFromDetail = await productDetailPage.getProductImage();
    const productDescriptionFromDetail =
      await productDetailPage.getProductDescription();
    const productPriceFromDetail = await productDetailPage.getProductPrice();

    await expect(productNameFromList).toBe(productNameFromDetail);
    await expect(productImageFromList).toBe(productImageFromDetail);
    await expect(productDescriptionFromList).toBe(productDescriptionFromDetail);
    await expect(productPriceFromList).toBe(productPriceFromDetail);
  });

  test("SD-16 Verify adding product to cart from Inventory Page", async () => {
    await inventoryPage.goTo();
    let shoppingCartBadgeCount = null;
    let removeFromCartButtonCount = null;
    let isVisible = await headerPage.shoppingCartBadgeIsVisible();
    if (isVisible) {
      shoppingCartBadgeCount = await headerPage.getShoppingCartBadgeCount();
      for (let i = 0; i < shoppingCartBadgeCount; i++) {
        await inventoryPage.clickRemoveFromCartButton(0);
      }
    }

    for (let i = 0; i < 2; i++) {
      await inventoryPage.clickAddToCartButton(0);
    }
    await expect(headerPage.shoppingCartBadge).toBeVisible();
    shoppingCartBadgeCount = await headerPage.getShoppingCartBadgeCount();
    removeFromCartButtonCount =
      await inventoryPage.getRemoveFromCartButtonCount();
    await expect(shoppingCartBadgeCount).toBe(removeFromCartButtonCount);
  });

  test("SD-17 Verify removing product from cart via Inventory Page", async () => {
    await inventoryPage.goTo();
    let shoppingCartBadgeCount = null;
    let removeFromCartButtonCount = null;
    let isVisible = await headerPage.shoppingCartBadgeIsVisible();
    if (!isVisible) {
      await inventoryPage.clickAddToCartButton(0);
    }
    shoppingCartBadgeCount = await headerPage.getShoppingCartBadgeCount();
    for (let i = 0; i < shoppingCartBadgeCount; i++) {
      await inventoryPage.clickRemoveFromCartButton(0);
    }
    await expect(headerPage.shoppingCartBadge).toBeHidden();
    shoppingCartBadgeCount = 0;
    removeFromCartButtonCount =
      await inventoryPage.getRemoveFromCartButtonCount();
    await expect(shoppingCartBadgeCount).toBe(removeFromCartButtonCount);
  });
});
