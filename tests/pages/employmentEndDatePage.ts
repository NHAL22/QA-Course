import { Page } from "playwright";
import { expect } from "@playwright/test";
import employmentEndDate_content from "../content/employmentEndDate_content";
import axeTest from "../accessibilityTestHelper";
import irregularHours_content from "../content/irregularHours_content";

class EmploymentEndDate {
    private readonly title: string;
    private readonly dayDate: string;
    private readonly monthDate: string;
    private readonly yearDate: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;


    constructor() {
        this.title = `.govuk-fieldset__heading`;
        this.dayDate = `#response-0`; // The date input field
        this.monthDate = `#response-1`;
        this.yearDate = `#response-2`;
        this.errorBanner = `.govuk-error-summary__title`;
        this.errorMessage = `.govuk-error-summary__body`;

    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(employmentEndDate_content.pageTitle),
        ]);
        await axeTest(page); // Run accessibility test
    }

    async continueOn(page: Page): Promise<void> {
        await page.locator(this.dayDate).fill("24");
        await page.locator(this.monthDate).fill("12");
        await page.locator(this.yearDate).fill("2024");
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await page.locator(this.dayDate).fill("01");
        await page.locator(this.monthDate).fill("01");
        await page.locator(this.yearDate).fill("2024");
        await page.getByRole("button", { name: "Continue" }).click();
        await Promise.all([
            expect(page.locator(this.errorBanner)).toHaveText(employmentEndDate_content.errorBanner),
            expect(page.locator(this.errorMessage)).toContainText(employmentEndDate_content.errorMessage),
        ]);
    }
}

export default EmploymentEndDate;
