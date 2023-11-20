const assert = require("node:assert");
const { Builder, By, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:8753/login");
    let title = await driver.getTitle();
    await driver.manage().setTimeouts({ implicit: 500 });

    // Login
    let loginEmail = await driver.findElement(By.id("loginEmail"));
    await loginEmail.sendKeys("admin");

    let loginPassword = await driver.findElement(By.id("loginPassword"));
    await loginPassword.sendKeys("admin");

    let submitButton = await driver.findElement(By.id("loginButton"));
    await submitButton.click();

    await driver.wait(until.urlIs("http://localhost:8753/subject"), 5000);

    //test login
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      currentUrl,
      "http://localhost:8753/subject",
      "URL is as expected",
    );

    // Log Out
    let adminLink = await driver.findElement(By.linkText("admin"));
    await adminLink.click();

    let logOut = await driver.findElement(By.linkText("Log Out"));
    await logOut.click();

    //Test log out
    const currentLogOutUrl = await driver.getCurrentUrl();
    assert.equal(
      currentLogOutUrl,
      "http://localhost:8753/login",
      "URL is as expected",
    );
  } finally {
    // Uncomment the following line to close the browser after the test
    await driver.quit();
  }
})();
