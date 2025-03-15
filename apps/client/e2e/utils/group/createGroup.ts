import { Page } from "@playwright/test";

export const createGroup = async (page: Page, name: string) => {
    await page.goto("/");
};
