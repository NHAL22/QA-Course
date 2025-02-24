import { Page } from 'playwright';
import {expect} from "@playwright/test";
import shiftsPerShiftPattern_content from "../content/shiftsPerShiftPattern_content";
import axeTest from "../accessibilityTestHelper";

class ShiftPerShiftPatternPage {
    private readonly title: string;
    private readonly field: string;

    constructor() {
        this.title = `.govuk-label-wrapper`
        this.field = `#response`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(shiftsPerShiftPattern_content.pageTitle),
        ]);
        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await page.locator(this.field).fill("5");
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }

}

export default ShiftPerShiftPatternPage;
