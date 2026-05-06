import {test, expect} from '@playwright/test'

test("Calendar validation", async({page})=>
{
    const date = "27";
    const month = "6";
    const year = "2027";
    const expList = [month, date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    //open the calendar
    await page.locator(".react-date-picker__calendar-button").click();

    //open the year page in calendar
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();

    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(month-1).click();
    await page.locator("//*[text()='"+date+"']").click();

    const actualDate = page.locator("//*[@class='react-date-picker__inputGroup']//input[not(@hidden)]");
    for(let i=0; i<expList.length; i++)
    {
        let inputVal = await actualDate.nth(i).inputValue();
        console.log(inputVal);
        expect(inputVal).toEqual(expList[i]);
    }


})