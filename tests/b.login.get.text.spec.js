const {test, expect} = require('@playwright/test')
//to run just this test use test.only()
test("Postivite validation: Login and get text",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allInnerTexts();
    console.log(allTitles);
    
})