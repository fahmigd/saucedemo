const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { validUser, lockoutUser, invalidUser } = require("../data/login.data");

test.describe("Login Feature", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("SD-01 Login with valid credentials", async () => {
    await loginPage.goTo();
    await loginPage.login(validUser.username, validUser.password);
  });

  test("SD-02 Login with locked out user", async () => {
    await loginPage.goTo();
    await loginPage.fillUsername(lockoutUser.username);
    await loginPage.fillPassword(lockoutUser.password);
    await loginPage.clickLoginButton();
    await expect(loginPage.loginAlert).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
    await loginPage.clickAlertCloseButton();
  });

  test("SD-03 Login with invalid username and password", async () => {
    await loginPage.goTo();
    await loginPage.fillUsername(invalidUser.username);
    await loginPage.fillPassword(invalidUser.password);
    await loginPage.clickLoginButton();
    await expect(loginPage.loginAlert).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("SD-04 Login with invalid password", async () => {
    await loginPage.goTo();
    await loginPage.fillUsername(validUser.username);
    await loginPage.fillPassword(invalidUser.password);
    await loginPage.clickLoginButton();
    await expect(loginPage.loginAlert).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("SD-05 Login with empty username and password", async () => {
    await loginPage.goTo();
    await loginPage.fillUsername("");
    await loginPage.fillPassword("");
    await loginPage.clickLoginButton();
    await expect(loginPage.loginAlert).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("SD-06 Login with only username filled", async () => {
    await loginPage.goTo();
    await loginPage.fillUsername(validUser.username);
    await loginPage.fillPassword("");
    await loginPage.clickLoginButton();
    await expect(loginPage.loginAlert).toHaveText(
      "Epic sadface: Password is required"
    );
  });

  test("SD-07 Login with only password filled", async () => {
    await loginPage.goTo();
    await loginPage.fillUsername("");
    await loginPage.fillPassword(validUser.password);
    await loginPage.clickLoginButton();
    await expect(loginPage.loginAlert).toHaveText(
      "Epic sadface: Username is required"
    );
  });
});
