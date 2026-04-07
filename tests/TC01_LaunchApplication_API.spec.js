const { test, expect } = require('@playwright/test'); 

test.only('TC01_LaunchApplication_API', async ({ request}) => {

    // Start a session
    const homeRes = await request.get('https://www.cloudberrystore.services/');
    //validate status
    expect(homeRes.ok()).toBeTruthy();

    // Validate headers
    expect(homeRes.headers()['content-type']).toContain('text/html');

    //Validate logo is displayed on home page 
    const homeHtml = await homeRes.text();

    expect(homeHtml).toContain('<img');



});