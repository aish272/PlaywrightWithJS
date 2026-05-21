const{test} = require('@playwright/test')

test("Abort calls and print request and response url", async({page})=>{

    page.route('**/*.{png,jpg,jpeg}',route=> route.abort());
     page.on("request", request => (console.log(request.url())));
    page.on("response",response=> console.log(response.url())) 
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();


})