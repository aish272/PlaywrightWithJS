const {test} = require('@playwright/test')

test("Open child window and perform actions", async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const promiseOutput = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]);

    const newPage = promiseOutput[0];

    const text = await newPage.locator(".red").textContent();
    const domainNameText = text.split("@")[1].split(" ")[0];

    await username.fill(domainNameText);
    console.log(await username.inputValue());





})