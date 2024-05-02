const assert = require("node:assert");
const { Builder, By, until, Browser } = require("selenium-webdriver");
require("dotenv").config();

async function pause(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// The pauses are used for better demonstration
// so we can clearly see what is happening in the browser while the test is running.
// On a slow machine it can be hard to see what is happening.
(async function example() {
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  const baseUrl = `http://localhost:${process.env.PORT}`;
  const timeoutMilliseconds = 10000;
  const pauseMilliseconds = 3000;

  try {
    await driver.get(`${baseUrl}/login`);
    const title = await driver.getTitle();
    await driver.manage().setTimeouts({ implicit: timeoutMilliseconds });

    // Login
    await pause(pauseMilliseconds);
    const loginEmail = await driver.findElement(By.id("loginEmail"));
    await loginEmail.sendKeys("admin");
    
    await pause(pauseMilliseconds);
    const loginPassword = await driver.findElement(By.id("loginPassword"));
    await loginPassword.sendKeys("admin");

    await pause(pauseMilliseconds);
    const submitButton = await driver.findElement(By.id("loginButton"));
    await submitButton.click();

    await driver.wait(until.urlIs(`${baseUrl}/department`), timeoutMilliseconds);

    // Test login
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      currentUrl,
      `${baseUrl}/department`,
      "URL is as expected",
    );

    // Log Out
    await pause(pauseMilliseconds);
    const adminLink = await driver.findElement(By.linkText("admin"));
    await adminLink.click();

    await pause(pauseMilliseconds);
    const logOut = await driver.findElement(By.linkText("Log Out"));
    await logOut.click();

    await pause(pauseMilliseconds);
    const logOutContinue = await driver.findElement(By.id("confirmation-dialog-continue-button"));
    await logOutContinue.click();

    await driver.wait(until.urlIs(`${baseUrl}/login`), timeoutMilliseconds);

    // Test log out
    const currentLogOutUrl = await driver.getCurrentUrl();
    assert.equal(
      currentLogOutUrl,
      `${baseUrl}/login`,
      "URL is as expected",
    );
  } finally {
    // Uncomment the following line to close the browser after the test
    await driver.quit();
  }
})();
