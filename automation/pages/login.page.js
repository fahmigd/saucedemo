class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.loginAlert = page.locator("[data-test='error']");
    this.alertCloseButton = page.locator("[data-test='error-button']");
  }

  async goTo() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.usernameInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickAlertCloseButton() {
    await this.alertCloseButton.click();
  }
}

module.exports = { LoginPage };
