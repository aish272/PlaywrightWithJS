const {test} = require('@playwright/test')

test("Login, wait for ele and get list of text",async({page})=>
{
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   //await page.waitForLoadState("networkidle");
   await page.locator(".card-body b").first().waitFor();
   const title = await page.locator(".card-body b").allTextContents();
   console.log(title);
})