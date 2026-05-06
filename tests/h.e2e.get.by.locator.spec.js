import { test, expect } from '@playwright/test';

test("End to end E-commerce test",async({page})=>
{
  
   const productName = "ZARA COAT 3";
   const email = "anshika@gmail.com";

   //Step: login to the account
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole("button",{name:"Login"}).click();

   //Step: Add the product to cart
   const products = page.locator(".card-body");
   
   await products.first().waitFor();

   await products.filter({hasText:productName}).getByRole("button",{name:"Add to Cart"}).click();
   

   await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
   await page.locator("div li").first().waitFor(); //need to wait for the page to load because isVisible() is not supported by auto-wait
   
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();


   //Step: checkout the product and fill details
   await page.getByText("Checkout").click();

   await page.getByPlaceholder("Select Country").pressSequentially("Ind");
   await page.getByRole("button", {name:"India"}).nth(1).click();

   
   await expect(page.locator(".user__name label")).toHaveText(email);
   await page.getByText("PLACE ORDER").click();
   
   //Step: validate order successful confirmation

   await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
   let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   orderId = orderId.split("| ")[1];
   orderId = orderId.split(" |")[0].trim();
   console.log(orderId);

   //Step: check order history

   await page.getByRole("button", {name:"ORDERS"}).click();

   const rows = page.locator("tbody tr");
   await rows.last().waitFor();

   await rows.filter({hasText:orderId}).getByRole("button",{name:"View"}).click();
   
   //await page.locator(".email-wrapper").first().waitFor();
   
   await expect(page.getByText(orderId)).toBeVisible();





})