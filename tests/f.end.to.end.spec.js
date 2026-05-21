const { test, expect } = require('@playwright/test')

test.only("End to end E-commerce test", async ({ page }) => {
   const products = page.locator(".card-body");
   const productName = "ZARA COAT 3";
   const email = "anshika@gmail.com";

   //Step: login to the account
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();

   //Step: Add the product to cart
   await products.first().waitFor();
   const count = await products.count();
   console.log(count);
   for (let i = 0; i < count; i++) {
      let item = await products.nth(i).locator("b").textContent();
      console.log(item);
      if (item == productName) {
         await products.nth(i).locator("text =' Add To Cart'").click();
         break;

      }
   }


   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor(); //need to wait for the page to load because isVisible() is not supported by auto-wait
   let ans = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(ans).toBeTruthy();

   //Step: checkout the product and fill details
   await page.locator("text='Checkout'").click();

   await page.locator("[placeholder*='Country']").pressSequentially("Ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();

   const options = dropdown.locator("button");
   const optionCount = await options.count();
   for (let i = 0; i < optionCount; i++) {
      let text = await options.nth(i).textContent();
      if (text.trim() === "India") {
         await options.nth(i).click();
         break;
      }
   }

   //to pause the page and see the performed action's outout
   //await page.pause();
   await expect(page.locator(".user__name label")).toHaveText(email);
   await page.locator(".action__submit").click();

   //Step: validate order successful confirmation

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   orderId = orderId.split("| ")[1];
   orderId = orderId.split(" |")[0].trim();
   console.log(orderId);

   //Step: check order history

   await page.locator("li [routerlink='/dashboard/myorders']").click();

   const rows = page.locator("tbody tr");
   await rows.last().waitFor();
   const rowCount = await rows.count();
   console.log(rowCount);
   for (let i = 0; i < rowCount; i++) {
      let text = await rows.nth(i).locator("[scope='row']").textContent();
      text = text.trim();
      console.log(text);
      if (text === orderId) {
         await rows.nth(i).locator(".btn-primary").click();
         break;
      }
   }
   await page.locator(".email-wrapper").first().waitFor();

   await expect(page.locator(".row .col-text")).toHaveText(orderId);





})