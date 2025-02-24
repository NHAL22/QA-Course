import { Page } from 'playwright';
import {expect} from "@playwright/test";
import answers_content from "../content/answers_content";
import answersFirstScenario_content from "../content/answersFirstScenario_content";
import axeTest from "../accessibilityTestHelper";
import answersSecondScenario_content from "../content/answersSecondScenario_content";

class AnswersPage {
    private readonly title: string;
    private readonly text: string;
    private readonly textFirstScenario: string;
    private readonly testSecondScenario: string;

    constructor() {
        this.title = `.govuk-heading-xl`
        this.text = `.summary`
        this.textFirstScenario = `.gem-c-govspeak`
        this.testSecondScenario = `.summary`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(answers_content.pageTitle),
            expect(page.locator(this.text)).toContainText(answers_content.divText),
        ]);
        await axeTest(page);
    }

    async checkPageLoadsFirstScenario(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(answersFirstScenario_content.pageTitle),
            expect(page.locator(this.textFirstScenario)).toContainText(answersFirstScenario_content.divText),
        ]);
        await axeTest(page);
    }

    async checkPageLoadsSecondScenario(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(answersSecondScenario_content.pageTitle),
            expect(page.locator(this.testSecondScenario)).toContainText(answersSecondScenario_content.divText),
        ]);
        await axeTest(page);
    }
}
export default AnswersPage;
