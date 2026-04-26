const {test, expect} = require('@playwright/test')

test('Browser context usage demo', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
});

test('Page fixture demo',async({page})=>
{
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle("Google");

});

test('Fetch error msg on entering wrong creds', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

});
