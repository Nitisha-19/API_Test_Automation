const { test, expect } = require('@playwright/test'); // 1) Import Playwright Test + assertion library

// 2) Load your JSON test data (Node can import JSON directly)
const dataset = require('../utils/CloudBerryStoreTestData.json'); // path may be ../Utils in your project
const users = dataset.Sheet1; // 3) Get the array of users from "Sheet1"

// 4) Loop through each user record and create a separate test
for (const data of users) {
  test(`TC02_Login_API-${data.username}`, async ({ request }) => {

// Step 1: Get the login page to establish session + obtain login_token
const loginPageRes = await request.get("https://www.cloudberrystore.services/index.php?route=account/login&language=en-gb");

//Verify the login page request succeed
expect(loginPageRes.ok()).toBeTruthy();

// Read the html body from the login page response

const html = await loginPageRes.text();

//Extract login_token from html

const match = html.match(/login_token=([a-zA-Z0-9]+)/);

// Verify if token exists

expect(match).not.toBeNull();

// Get teh token string

const loginToken = match[1];
 //match[0]	Full matched string → "login_token=ABC123XYZ" 
//match[1]	Only the token → "ABC123XYZ"

// Call the actual login API endpoint

const loginRes = await request.post(`https://www.cloudberrystore.services/index.php?route=account/login.login&language=en-gb&login_token=${loginToken}`,
  {
    form: {
      email: data.username,
      password: data.password,
    },
    
     headers: {
          'x-requested-with': 'XMLHttpRequest',
          'accept': 'application/json, text/javascript, */*; q=0.01',
        },


  }
);

// Verify login API response status is 2xx
expect(loginPageRes.ok()).toBeTruthy();

const body = await loginRes.json();

// 17) Validate login success:
    //     Many OpenCart flows return:
    //     - { success: "...", redirect: "..." }
    //     On failure they often return:
    //     - { error: { warning: "..." } }
    expect(body.error, `Login failed for ${data.username}: ${JSON.stringify(body)}`).toBeFalsy();

    // 18) Ensure we got a success marker (success message or redirect)
    expect(body.success || body.redirect, `Unexpected login response: ${JSON.stringify(body)}`).toBeTruthy();

    // Verify authenticated session by opening My Account Page using same request context
const accountRes = await request.get('https://www.cloudberrystore.services/index.php?route=account/account&language=en-gb');

//Account page loaded successfully
expect(accountRes.ok()).toBeTruthy();

// Check the account page html contains "My Account"
const accountHtml = await accountRes.text();
expect(accountHtml).toContain('My Account');
  });
}