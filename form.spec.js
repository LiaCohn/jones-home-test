const { test, expect } = require('@playwright/test');
const { BASE_URL, THANK_YOU_URL, selectors, validDetails } = require('./consts');

//fill the form, optional fields only if provided
const fillForm = async (page, details) => {
    await page.locator(selectors.name).fill(details.name);
    await page.locator(selectors.email).fill(details.email);
    await page.locator(selectors.phone).fill(details.phone);
    if (details.company) await page.locator(selectors.company).fill(details.company);
    if (details.website) await page.locator(selectors.website).fill(details.website);
    if (details.employees) await page.locator(selectors.employees).selectOption(details.employees);
};

const submit = async (page) => {
    await page.locator(selectors.submit).click();
};


test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});


test('fill all fields and reach the thank you page', async ({ page }) => {
    await fillForm(page, validDetails);

    //check the values before submitting
    await expect(page.locator(selectors.name)).toHaveValue(validDetails.name);
    await expect(page.locator(selectors.employees)).toHaveValue('51-500');

    //take screenshot before submitting
    await page.screenshot({ path: 'before-submit.png' });

    await submit(page);
    await expect(page).toHaveURL(THANK_YOU_URL);
    console.log('Reached the thank you page!');
});

test('required fields only', async ({ page }) => {
    const { name, email, phone } = validDetails;
    await fillForm(page, { name, email, phone });

    await submit(page);
    await expect(page).toHaveURL(THANK_YOU_URL);
});


test('empty name does not submit', async ({ page }) => {
    await fillForm(page, { ...validDetails, name: '' });

    await submit(page);
    await expect(page.locator(`${selectors.name}:invalid`)).toHaveCount(1);
    await expect(page).not.toHaveURL(THANK_YOU_URL);
});

test('invalid email does not submit', async ({ page }) => {
    await fillForm(page, { ...validDetails, email: 'abc' });

    await submit(page);
    await expect(page.locator(`${selectors.email}:invalid`)).toHaveCount(1);
    await expect(page).not.toHaveURL(THANK_YOU_URL);
});