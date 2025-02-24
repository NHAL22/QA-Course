import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularHours_content from "../content/irregularHours_content";
import axeTest from "../accessibilityTestHelper";

class IrregularHoursPage {
    private readonly title: string;
    private readonly text: string;
    private readonly radioYes: string;
    private readonly radioNo: string;
    private readonly errorBanner: string;
    private readonly errorMessage: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.text = `.govuk-hint`
        this.radioYes = `label[for="response-0"]`
        this.radioNo = `label[for="response-1"]`
        this.errorBanner = `.govuk-error-summary__title`
        this.errorMessage = `.govuk-error-message`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toHaveText(irregularHours_content.pageTitle),
            expect(page.locator(this.text)).toContainText(irregularHours_content.divText),
            expect(page.locator(this.radioYes)).toContainText(irregularHours_content.radioYes),
            expect(page.locator(this.radioNo)).toContainText(irregularHours_content.radioNo),
        ]);
        await axeTest(page);
    }

    async selectNo(page: Page): Promise<void> {
        await page.click('label[for="response-1"]');
        // Click the continue button
    }

    async selectYes(page: Page): Promise<void> {
        await page.click('label[for="response-0"]');
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async triggerErrorMessages(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
        await Promise.all([
            expect(page.locator(this.errorBanner)).toHaveText(irregularHours_content.errorBanner),
            expect(page.locator(this.errorMessage)).toContainText(irregularHours_content.errorMessage),
        ]);
    }

}

export default IrregularHoursPage;
