📦 API Test Automation Framework (Playwright)

This project is a robust API Test Automation Framework built using Playwright. It is designed to validate REST APIs with scalable, maintainable, and reusable test structures.

🚀 Tech Stack
Language: JavaScript / TypeScript
Framework: Playwright
Assertion Library: Playwright Test (@playwright/test)
API Testing: Built-in Playwright request API
CI/CD: GitHub Actions (workflow included)
📁 Project Structure
API_Test_Automation/
│── tests/                # API test cases
│── utils/                # Helper utilities (if any)
│── test-data/            # Test data files
│── playwright.config.js  # Playwright configuration
│── package.json          # Project dependencies
│── .github/workflows/    # CI/CD pipeline (Playwright tests)
✅ Features
🔹 End-to-End API Testing using Playwright
🔹 Clean and scalable test structure
🔹 Built-in request handling (no external libraries needed)
🔹 Assertions using Playwright Test
🔹 CI/CD integration using GitHub Actions
🔹 Easy to extend for additional APIs
🧪 Sample Test
const { test, expect } = require('@playwright/test');

test('TC01_LaunchApplication_API', async ({ request }) => {

    const response = await request.get('https://www.cloudberrystore.services/');

    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain('logo');

});
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/Nitisha-19/API_Test_Automation.git
cd API_Test_Automation
2️⃣ Install Dependencies
npm install
3️⃣ Install Playwright Browsers
npx playwright install
▶️ Run Tests

Run all tests:

npx playwright test

Run a specific test:

npx playwright test tests/<test-file-name>.js

Run in headed mode:

npx playwright test --headed
📊 Test Reports

After execution, view the HTML report:

npx playwright show-report
🔄 CI/CD Integration

This project includes a GitHub Actions workflow:

Automatically runs tests on push
Ensures code quality and API stability

Workflow file:

.github/workflows/playwright.yml
📌 Future Enhancements
✅ Add environment-based configuration
✅ Integrate test data management
✅ Add API schema validation
✅ Add logging & reporting improvements
✅ Parallel execution optimization
