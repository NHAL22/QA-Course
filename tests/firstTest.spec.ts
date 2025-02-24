import {expect, test} from "@playwright/test";

test('first test', async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');
    await expect(page.locator(`.govuk-heading-xl`)).toHaveText('Calculate holiday entitlement');
    await page.getByRole("button", {name: "Start now"}).click();
    await expect(page.locator('.govuk-fieldset__heading')).toHaveText(`Does the employee work irregular hours or for part of the year?`);
});
