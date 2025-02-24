import { Page } from "playwright";
import { expect } from "@playwright/test";
import leaveYearStart_content from "../content/leaveYearStart_content";
import axeTest from "../accessibilityTestHelper";

class LeaveYearStartPage {
    private readonly title: string;
    private readonly text: string;
    private readonly dayDate: string;
    private readonly monthDate: string;
    private readonly yearDate: string;


    constructor() {
        this.title = `.govuk-fieldset__heading`;
        this.text = `.govuk-hint`;
        this.dayDate = `#response-0`; // The date input field
        this.monthDate = `#response-1`;
        this.yearDate = `#response-2`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(leaveYearStart_content.pageTitle),
            expect(page.locator(this.text)).toContainText(leaveYearStart_content.divText),
        ]);
        await axeTest(page); // Run accessibility test
    }

    async continueOn(page: Page): Promise<void> {
        await page.locator(this.dayDate).fill("01");
        await page.locator(this.monthDate).fill("01");
        await page.locator(this.yearDate).fill("2024");
        await page.getByRole("button", { name: "Continue" }).click();
    }

}

export default LeaveYearStartPage;
