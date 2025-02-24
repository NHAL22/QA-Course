import { Page } from 'playwright';
import {expect} from "@playwright/test";
import answers_content from "../content/answers_content";
import axeTest from "../accessibilityTestHelper";

class AnswersPage {
    private readonly title: string;
    private readonly text: string;

    constructor() {
        this.title = `.govuk-heading-xl`
        this.text = `.summary`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(answers_content.pageTitle),
            expect(page.locator(this.text)).toContainText(answers_content.divText),
        ]);
        await axeTest(page);
    }
}
export default AnswersPage;
