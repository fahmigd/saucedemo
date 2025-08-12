# SauceDemo Automation (Playwright)

Automation test scripts for [SauceDemo](https://www.saucedemo.com/) web application using [Microsoft Playwright](https://playwright.dev/).  
This project is designed to perform end-to-end testing for SauceDemo features such as Login, Inventory, Product Details, Shopping Cart, Checkout Process and Side Navigation Menu using a **Page Object Model (POM)** approach.

---

## 📦 Requirements

Before starting, make sure you have installed:
- [Node.js](https://nodejs.org/) **v16+**  
- npm (comes with Node.js)  
- [Git](https://git-scm.com/)  
- Internet connection (required for Playwright browser downloads)

---

## 📥 Clone Repository

1. Open **Terminal** or **Command Prompt**.
2. Clone the repository:
   ```bash
   git clone https://github.com/fahmigd/saucedemo.git
   ```
3. Navigate to the automation folder:
   ```bash
    cd saucedemo/automation
   ```

----

## 📦 Install Dependencies
Install all required npm packages:
   ```bash
    npm install
```

----

## ⚙️ Install Playwright Browsers
Playwright requires browser binaries to run tests. Install them with:
   ```bash
    npx playwright install
```

----

## ▶️ Running Tests
### Run all tests:
   ```bash
    npx playwright test
```
### Run a specific test file:
   ```bash
    npx playwright test tests/login.spec.js
```
### Run a specific test case by title :
   ```bash
    npx playwright test -g "Valid login with correct credentials"
```
### Run tests in headed mode (show browser UI):
   ```bash
    npx playwright test --headed
```
### Run tests in UI mode (Playwright Test Runner):
   ```bash
    npx playwright test --ui
```
### Run tests in a specific browser:
   ```bash
    npx playwright test --project=chromium
    npx playwright test --project=firefox
    npx playwright test --project=webkit
```

----

## 📄 Viewing Test Reports
After running tests, view the HTML report:
   ```bash
    npx playwright show-report
```
This will open a detailed test report in your default browser, showing:
- ✅ Passed / failed test cases
- ⏱ Execution time
- 🖼 Screenshots (for failed tests)
- 📂 Traces (if enabled)

---
