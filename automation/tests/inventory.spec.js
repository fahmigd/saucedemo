const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { InventoryPage } = require("../pages/inventory.page");
const { validUser } = require("../data/login.data");
const { sort } = require("../data/product.data");

test.describe("Inventory Feature", () => {
  let loginPage;
  let inventoryPage;
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goTo();
    await loginPage.login(validUser.username, validUser.password);
    await expect(inventoryPage.titlePage).toHaveText("Products");
    const count = await inventoryPage.getCount();
    for (let i = 0; i < count; i++) {
      await expect(inventoryPage.productNames.nth(i)).toBeVisible();
      await expect(inventoryPage.productImage.nth(i)).toBeVisible();
      await expect(inventoryPage.productDescription.nth(i)).toBeVisible();
      await expect(inventoryPage.productPrice.nth(i)).toBeVisible();
      await expect(inventoryPage.productAddtoCartButton.nth(i)).toBeVisible();
    }
    expect(page.url()).toContain("/inventory.html");
  });

  test("SD-10 Verify sorting products by Name (A to Z)", async () => {
    await inventoryPage.sortBy(sort.nameAsc);
    const productName = await inventoryPage.getProductNames();
    const productNameAsc = await inventoryPage.sortProductNamesAsc(productName);
    expect(productName).toEqual(productNameAsc);
  });

  test("SD-11 Verify sorting products by Name (Z to A)", async () => {
    await inventoryPage.sortBy(sort.nameDesc);
    const productName = await inventoryPage.getProductNames();
    const productNameDesc = await inventoryPage.sortProductNamesDesc(
      productName
    );
    expect(productName).toEqual(productNameDesc);
  });

  test("SD-12 Verify sorting products by Price (low to high)", async () => {
    await inventoryPage.sortBy(sort.priceAsc);
    const productPrice = await inventoryPage.getProductPrice();
    const productPriceAsc = await inventoryPage.sortProductPriceAsc(
      productPrice
    );
    expect(productPrice).toEqual(productPriceAsc);
  });

  test("SD-13 Verify sorting products by Price (high to low)", async () => {
    await inventoryPage.sortBy(sort.priceDesc);
    const productPrice = await inventoryPage.getProductPrice();
    const productPriceDesc = await inventoryPage.sortProductPriceDesc(
      productPrice
    );
    expect(productPrice).toEqual(productPriceDesc);
  });

  test("SD-14 Verify clicking product name navigates to details", async () => {
    const name = await inventoryPage.productNames.nth(0).textContent();
    const image = await inventoryPage.productImage.nth(0).getAttribute("src");
    const description = await inventoryPage.productDescription
      .nth(0)
      .textContent();
    // const price = await inventoryPage.productPrice.nth(0).textContent();
    // console.log(name);
    // console.log(image);
    // console.log(description);
    // console.log(price);
  });
});
