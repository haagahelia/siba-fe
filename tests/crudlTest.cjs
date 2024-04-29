const assert = require("node:assert");
const { Builder, By, until, Browser } = require("selenium-webdriver");
require("dotenv").config();

(async function example() {
  const baseUrl = `http://localhost:${process.env.PORT}`;
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get(`${baseUrl}/login`);
    const title = await driver.getTitle();
    await driver.manage().setTimeouts({ implicit: 500 });

    // Login
    const loginEmail = await driver.findElement(By.id("loginEmail"));
    await loginEmail.sendKeys("admin");

    const loginPassword = await driver.findElement(By.id("loginPassword"));
    await loginPassword.sendKeys("admin");

    const submitButton = await driver.findElement(By.id("loginButton"));
    await submitButton.click();

    await driver.wait(until.urlIs(`${baseUrl}/subject`), 5000);

    //test login
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      currentUrl,
      `${baseUrl}/subject`,
      "URL is as expected",
    );

    // Log Out
    const adminLink = await driver.findElement(By.linkText("admin"));
    await adminLink.click();

    const logOut = await driver.findElement(By.linkText("Log Out"));
    await logOut.click();

    //Test log out
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
