const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { InventoryPage } = require("../pages/inventory.page");
const { ProductDetailPage } = require("../pages/product-detail.page");
const { validUser } = require("../data/login.data");
const { sort } = require("../data/product.data");

test.describe("Inventory Feature", () => {
  let loginPage;
  let inventoryPage;
  let productDetailPage;
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productDetailPage = new ProductDetailPage(page);

    await loginPage.goTo();
    await loginPage.login(validUser.username, validUser.password);
    await expect(inventoryPage.titlePage).toHaveText("Products");
    const count = await inventoryPage.getCount();
    for (let i = 0; i < count; i++) {
      await expect(inventoryPage.productName.nth(i)).toBeVisible();
      await expect(inventoryPage.productImage.nth(i)).toBeVisible();
      await expect(inventoryPage.productDescription.nth(i)).toBeVisible();
      await expect(inventoryPage.productPrice.nth(i)).toBeVisible();
      await expect(inventoryPage.productAddToCartButton.nth(i)).toBeVisible();
    }
    expect(page.url()).toContain("/inventory.html");
  });

  test("SD-10 Verify sorting products by Name (A to Z)", async () => {
    await inventoryPage.sortBy(sort.nameAsc);
    const productNameList = await inventoryPage.getProductNameList();
    const productNameListAsc = await inventoryPage.sortByProductNamesAsc(
      productNameList
    );
    expect(productNameList).toEqual(productNameListAsc);
  });

  test("SD-11 Verify sorting products by Name (Z to A)", async () => {
    await inventoryPage.sortBy(sort.nameDesc);
    const productNameList = await inventoryPage.getProductNameList();
    const productNameListDesc = await inventoryPage.sortByProductNamesDesc(
      productNameList
    );
    expect(productNameList).toEqual(productNameListDesc);
  });

  test("SD-12 Verify sorting products by Price (low to high)", async () => {
    await inventoryPage.sortBy(sort.priceAsc);
    const productPriceList = await inventoryPage.getProductPriceList();
    const productPriceListAsc = await inventoryPage.sortByProductPriceAsc(
      productPriceList
    );
    expect(productPriceList).toEqual(productPriceListAsc);
  });

  test("SD-13 Verify sorting products by Price (high to low)", async () => {
    await inventoryPage.sortBy(sort.priceDesc);
    const productPriceList = await inventoryPage.getProductPriceList();
    const productPriceListDesc = await inventoryPage.sortByProductPriceDesc(
      productPriceList
    );
    expect(productPriceList).toEqual(productPriceListDesc);
  });

  test("SD-14 Verify clicking product name navigates to details", async () => {
    const i = 0;
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

    expect(productNameFromList).toBe(productNameFromDetail);
    expect(productImageFromList).toBe(productImageFromDetail);
    expect(productDescriptionFromList).toBe(productDescriptionFromDetail);
    expect(productPriceFromList).toBe(productPriceFromDetail);
  });

  test("SD-15 Verify clicking product image navigates to details", async () => {
    const i = 1;
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

    expect(productNameFromList).toBe(productNameFromDetail);
    expect(productImageFromList).toBe(productImageFromDetail);
    expect(productDescriptionFromList).toBe(productDescriptionFromDetail);
    expect(productPriceFromList).toBe(productPriceFromDetail);
  });
});
