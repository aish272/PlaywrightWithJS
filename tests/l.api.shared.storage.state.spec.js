const{test} = require('@playwright/test');
let sharedContext;
let sharedPage;

test.beforeAll('Store storage state', async({browser})=>
{

    //Step: login to the account
   const context = await browser.newContext();
   const page = await context.newPage(); 
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState("networkidle");
   await context.storageState({path:"sharedState.json"});
   sharedContext = await browser.newContext({storageState:"sharedState.json"});



})

test("Add to cart test",async()=>
{

   sharedPage = await sharedContext.newPage(); 
   const products = sharedPage.locator(".card-body");
   const productName = "ZARA COAT 3";
   

   //Step: Navigate
   await sharedPage.goto("https://rahulshettyacademy.com/client");

   //Step: Add the product to cart
   await products.first().waitFor();
   const count = await products.count();
   console.log(count);
   for(let i =0; i<count; i++)
   {
      let item = await products.nth(i).locator("b").textContent();
      console.log(item);
      if(item==productName)
      {
         await products.nth(i).locator("text =' Add To Cart'").click();
         break;

      }
   }


})

test("Add to cart test 2",async()=>
{

   const products = sharedPage.locator(".card-body");
   const productName = "ZARA COAT 3";
   

   
   //Step: Add the product to cart
   await products.first().waitFor();
   const count = await products.count();
   console.log(count);
   for(let i =0; i<count; i++)
   {
      let item = await products.nth(i).locator("b").textContent();
      console.log(item);
      if(item==productName)
      {
         await products.nth(i).locator("text =' Add To Cart'").click();
         break;

      }
   }


})

test("Text content",async()=>
{

   const products = sharedPage.locator(".card-body");
   
   
   //Step: Print text
   await products.first().waitFor();
   console.log(await products.allTextContents());


})