const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { InventoryPage } = require("../pages/inventory.page");
const { HeaderPage } = require("../pages/components/header.page");
const { validUser } = require("../data/login.data");

test.describe("Shopping Cart Feature", () => {
  let loginPage;
  let inventoryPage;
  let headerPage;
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);

    await loginPage.goTo();
    await loginPage.login(validUser.username, validUser.password);
    await expect(inventoryPage.titlePage).toHaveText("Products");
    await expect(page.url()).toContain("/inventory.html");
  });

  test.beforeEach(async () => {
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

  test("SD-28 Verify cart displays correct product details", async () => {
    console.log("SD 28");
  });
});
