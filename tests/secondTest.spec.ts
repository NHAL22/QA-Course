import {expect, test} from "@playwright/test";

test(`Second test solution`, async ({ page }) => {
    await page.goto(`https://www.gov.uk/calculate-your-holiday-entitlement`);
    await expect(page.locator(`.govuk-heading-xl`)).toHaveText(`Calculate holiday entitlement`);
    await page.getByRole("button", { name: "Start now" }).click();

    await expect(page.locator(`.govuk-fieldset__heading`)).toHaveText(`Does the employee work irregular hours or for part of the year?`);
    await page.click('label[for="response-1"]');
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.locator(`.govuk-fieldset__heading`)).toHaveText(`Is the holiday entitlement based on:`);
    await page.click('label[for="response-0"]');
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.locator(`.govuk-fieldset__heading`)).toHaveText(`Do you want to work out holiday:`);
    await page.click('label[for="response-0"]');
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.locator(`.govuk-label-wrapper`)).toHaveText(`Number of days worked per week?`);
    await page.locator(`#response`).fill("5"); //Using locator.fill() is the easiest way to fill out the form fields.
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.locator(`.govuk-heading-xl`)).toContainText(`Information based on your answers`); //have to make sure to see if its govuk-heading-xl or govuk-label-wrapper
    //contain text is used for when theres an html block that contains more info than u need to check for.
    await expect(page.locator(`.summary`)).toHaveText(`The statutory holiday entitlement is 28 days holiday.`);
});
