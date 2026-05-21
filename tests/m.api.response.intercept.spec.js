const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils')
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayload = { orders: [{ country: "cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {

   //login and order placing would be done as prerequisite
   const apiContext = await request.newContext();
   const apiutil = new APIUtils(apiContext, loginPayload);
   response = await apiutil.createOrder(orderPayload);

})

test("Intercept call and send fake response", async ({ page }) => {
   page.addInitScript(value => {
      window.localStorage.setItem("token", value)
   }, response.token);

   page.goto("https://rahulshettyacademy.com/client");

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async (route) => {
      const ogResponse = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
         {
            response: response,
            body: body
         }
      );
   });

   await page.locator("button[routerlink*='myorders']").click();
   await page.waitForResponse
      ("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   console.log(await page.locator(".mt-4").textContent());


})