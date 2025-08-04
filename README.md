# 🧪 SauceDemo QA Testing Project

This repository serves as a **QA portfolio project** containing manual test cases, automation scripts, and bug reporting for end-to-end testing of **[SauceDemo](https://www.saucedemo.com/)** — a demo e-commerce web application provided by Sauce Labs for testing practice.

---

## 📦 Scope of Testing

### 1. 🔐 **Login Page**
- Username and password input fields
- User authentication scenarios:
  - ✅ Valid login (`standard_user`)
  - ❌ Invalid login (wrong credentials)
  - 🔒 Locked out user
- Error messages for failed login
- Password input field is masked

---

### 2. 🛍️ **Inventory Page (Product Listing)**
- Displays a list of available products
- Each product includes:
  - Product name
  - Description
  - Price
  - Image
- Product actions:
  - `Add to Cart` / `Remove` buttons
- Product sorting options:
  - Name: A to Z / Z to A
  - Price: Low to High / High to Low

---

### 3. 📄 **Product Details Page**
- Detailed information of selected product:
  - Product name
  - Image
  - Description
  - Price
- Buttons:
  - `Add to Cart`
  - `Back to Products`

---

### 4. 🛒 **Shopping Cart**
- Shows products added to the cart
- Option to remove products
- Cart icon updates item count
- Navigation buttons:
  - `Continue Shopping`
  - `Checkout`

---

### 5. 💳 **Checkout Process**

#### Step 1: Your Information
- Input fields:
  - First Name
  - Last Name
  - Postal Code
- Validation for required fields

#### Step 2: Overview
- Order summary includes:
  - Item total
  - Tax
  - Final total price

#### Step 3: Order Complete
- Display "Thank You" message
- Confirmation that order is complete

---

### 6. 📂 **Side Navigation Menu**
- Opened via hamburger icon (`≡`)
- Menu options:
  - 🧾 All Items (returns to product listing)
  - 🔗 About (external link to Sauce Labs)
  - 🚪 Logout
  - 🔄 Reset App State (clears cart and session state)

---

## 🧰 Tools Used

- Manual Test Cases: Qase.io / PDF / CSV  
- Automation: Playwright  
- Programming Language: JavaScript / TypeScript  
- Bug Reports: Markdown + Screenshot + Steps to Reproduce  
- Test Reports: HTML / Allure  

---

Feel free to fork, clone, or contribute for QA learning and portfolio building purposes.
