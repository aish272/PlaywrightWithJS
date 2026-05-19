import {test, expect} from '@playwright/test'

test("Navigation and visibility", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goBack();
    await page.goForward();

    await page.getByText("Hide").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.getByText("Show").click();
    await expect(page.locator("#displayed-text")).toBeVisible();

})

test("Popop and hover demo", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on("dialog", async (dialog) => 
        {console.log(dialog.message())
         await dialog.accept();
        }
    );
    
    await page.locator("#alertbtn").click();

    await page.locator("#mousehover").hover();

})

test("Frames", async({page})=>{

     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const frameLocator = page.frameLocator("#courses-iframe");
    //:visible is used to filter out only visible locators
    await frameLocator.locator("[href='learning-path']:visible").click();
    console.log(await frameLocator.locator(".content-side .text").textContent());

})