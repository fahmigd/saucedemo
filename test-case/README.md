# SauceDemo Test Suites Documentation

## 1. Login
Test suite for verifying all login scenarios of the SauceDemo web application.  
This includes both **positive** and **negative** test cases, covering:
- Valid login with correct credentials  
- Invalid login attempts (wrong username, wrong password, locked-out users)  
- Field validations (required fields, input format)  
- UI checks for login form elements  
- Error message validations
![Login Page Screenshot](https://prnt.sc/wJOi_sfj-tze) 
---

## 2. Inventory (Product Listing)
The Inventory Page displays a list of all available products after a successful user login.  
Each product includes:
- Product name  
- Product description  
- Product price  
- Product image  
- Action buttons: **Add to cart** or **Remove**  

Sorting options (dropdown):
- Name: A to Z / Z to A  
- Price: Low to High / High to Low  

This test suite covers:
- Verification of UI elements and product details  
- Functionality of action buttons  
- Product sorting features  
- Positive and negative test scenarios to ensure system reliability and stability  

---

## 3. Product Details
This suite contains test cases for validating the **Product Details Page** on SauceDemo, including:
- Accuracy of product information (name, description, price, image)  
- **Add to Cart** functionality from details page  
- Navigation behavior (back to product list, cart, etc.)  
- Negative scenarios for edge case validation  

---

## 4. Shopping Cart
This suite covers test cases for the **Shopping Cart** functionality, including:
- Verification of cart item listing and details  
- Quantity management (increase/decrease item count)  
- Remove item actions  
- Subtotal price accuracy  
- Navigation flow to Checkout  
- Edge case scenarios to ensure cart data consistency  

---

## 5. Side Navigation Menu (Burger Menu)
This suite includes test cases for validating the **Side Navigation Menu** functionality, covering:
- Menu open/close behavior  
- Navigation links:
  - All Items  
  - About  
  - Logout  
  - Reset App State  
- Accessibility via keyboard navigation  
- Security validations ensuring the menu is only accessible when the user is logged in  
