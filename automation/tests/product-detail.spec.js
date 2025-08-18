const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { InventoryPage } = require("../pages/inventory.page");
const { ProductDetailPage } = require("../pages/product-detail.page");
const { HeaderPage } = require("../pages/components/header.page");
const { validUser } = require("../data/login.data");

test.describe("Product Detail Feature", () => {
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
    await expect(page.url()).toContain("/inventory.html");
  });

  test.beforeEach(async () => {
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

  test("SD-21 Verify Add to Cart from Product Details Page", async () => {
    let shoppingCartBadgeCountBefore = 0;
    let shoppingCartBadgeCountAfter = 0;
    let shoppingCartBadgeCount = 0;

    let isRemoveCardButtonVisible =
      await productDetailPage.removeFromCartButtonIsVisible();
    if (isRemoveCardButtonVisible) {
      await productDetailPage.clickRemoveFromCartButton();
    }

    let isCardBadgeVisible = await headerPage.shoppingCartBadgeIsVisible();
    if (isCardBadgeVisible) {
      shoppingCartBadgeCountBefore =
        await headerPage.getShoppingCartBadgeCount();
    }
    await productDetailPage.clickAddToCartButton();
    shoppingCartBadgeCountAfter = shoppingCartBadgeCountBefore + 1;

    shoppingCartBadgeCount = await headerPage.getShoppingCartBadgeCount();
    await expect(shoppingCartBadgeCount).toBe(shoppingCartBadgeCountAfter);
  });

  test("SD-22 Verify Add to Cart from Product Details Page", async () => {
    let shoppingCartBadgeCountBefore = 0;
    let shoppingCartBadgeCountAfter = 0;
    let shoppingCartBadgeCount = 0;

    let isRemoveCardButtonVisible =
      await productDetailPage.removeFromCartButtonIsVisible();
    if (!isRemoveCardButtonVisible) {
      await productDetailPage.clickAddToCartButton();
    }

    shoppingCartBadgeCountBefore = await headerPage.getShoppingCartBadgeCount();
    await productDetailPage.clickRemoveFromCartButton();
    shoppingCartBadgeCountAfter = shoppingCartBadgeCountBefore - 1;

    let isCardBadgeVisible = await headerPage.shoppingCartBadgeIsVisible();
    if (!isCardBadgeVisible) {
      shoppingCartBadgeCount = 0;
    }
    await expect(shoppingCartBadgeCount).toBe(shoppingCartBadgeCountAfter);
  });

  test("SD-23 Verify Back to Products button navigates correctly", async () => {
    await productDetailPage.clickBackToProductButton();
    await expect(inventoryPage.titlePage).toHaveText("Products");
    await expect(page.url()).toContain("/inventory.html");
  });

  test("SD-24 Verify Add to Cart button changes to Remove", async () => {
    let isRemoveCardButtonVisible =
      await productDetailPage.removeFromCartButtonIsVisible();
    if (isRemoveCardButtonVisible) {
      await productDetailPage.clickRemoveFromCartButton();
    }
    await productDetailPage.clickAddToCartButton();
    await expect(productDetailPage.removeFromCartButton).toBeVisible();
  });
});
