import { Page } from 'playwright';
import {expect} from "@playwright/test";
import calculateHoliday_content from "../content/calculateHoliday_content";
import axeTest from "../accessibilityTestHelper";

class CalculateHolidayPage {
    private readonly title: string;
    private readonly radio1: string;
    private readonly radio2: string;
    private readonly radio3: string;
    private readonly radio4: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.radio1 = `label[for="response-0"]`
        this.radio2 = `label[for="response-1"]`
        this.radio3 = `label[for="response-2"]`
        this.radio4 = `label[for="response-3"]`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(calculateHoliday_content.pageTitle),
            expect(page.locator(this.radio1)).toContainText(calculateHoliday_content.radio1),
            expect(page.locator(this.radio2)).toContainText(calculateHoliday_content.radio2),
            expect(page.locator(this.radio3)).toContainText(calculateHoliday_content.radio3),
            expect(page.locator(this.radio4)).toContainText(calculateHoliday_content.radio4),
        ]);
        await axeTest(page);
    }

    async continueOnWithLastOption(page: Page): Promise<void> {
        await page.click('label[for="response-3"]');
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default CalculateHolidayPage;
