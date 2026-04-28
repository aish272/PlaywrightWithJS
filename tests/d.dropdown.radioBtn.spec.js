const {test, expect} = require("@playwright/test")

test("Perform actions on dropdown, radio button and checkbox", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    //dropdown
    const dropdown = page.locator("select.form-control");
    await  dropdown.selectOption("consult");

    //radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //assertion
    //print checked/unchecked
    console.log( await page.locator(".radiotextsty").last().isChecked());
    //assert
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    //radio button
    const checkbox = page.locator("#terms");
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy(); //there is no direct assertion to check unchecked state, hence using the alternate

    //check attribute val
    await expect(documentLink).toHaveAttribute("class","blinkingText");



    
})