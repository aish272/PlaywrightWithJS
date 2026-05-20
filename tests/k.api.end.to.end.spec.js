const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils')
const loginPayload = {userEmail:"anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders:[{country:"cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response;

test.beforeAll(async()=>{

   //login and order placing would be done as prerequisite
   const apiContext = await request.newContext();
   const apiutil = new APIUtils(apiContext, loginPayload);
   response = await apiutil.createOrder(orderPayload);

})

test("End to end E-commerce test",async({page})=>
{
   await page.addInitScript(value => {
      window.localStorage.setItem("token",value);
   }, response.token);

   const orderId = response.orderID;
   //Step: check order history
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("li [routerlink='/dashboard/myorders']").click();

   const rows = page.locator("tbody tr");
   await rows.last().waitFor();
   const rowCount = await rows.count();
   console.log(rowCount);
   for(let i =0; i<rowCount; i++)
   {
      let text = await rows.nth(i).locator("[scope='row']").textContent();
      text = text.trim();
      console.log(text);
      if(text===orderId)
      {
         await rows.nth(i).locator(".btn-primary").click();
         break;
      }
   }
   await page.locator(".email-wrapper").first().waitFor();
   
   await expect(page.locator(".row .col-text")).toHaveText(orderId);





})