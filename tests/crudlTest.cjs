const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:8753/');
    let title = await driver.getTitle();
    await driver.manage().setTimeouts({ implicit: 500 });
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
    await textBox.sendKeys('nyt');
    console.log(title);
  } finally {
    // Uncomment the following line to close the browser after the test
    // await driver.quit();
  }
})();
