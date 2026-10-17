# Jones Home Test

## Task 1 - Playwright Automation

Fills the contact form at https://test.netlify.app/ and checks that it reaches the thank you page.

### Setup

```bash
npm install
npx playwright install chromium
```

### Run

```bash
npx playwright test
```

### Files

- `consts.js` - url, selectors and test data
- `form.spec.js` - the tests

### What's tested

- all fields filled (employees set to 51-500), screenshot before submit, thank you page reached
- required fields only
- empty name and invalid email don't submit

I didn't add a negative test for phone, the site doesn't validate that field.

## Task 2 - UI Analysis

See `ui-analysis.txt`.