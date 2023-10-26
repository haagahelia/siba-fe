const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
try {
  await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
  let title = await driver.getTitle();
  await driver.manage().setTimeouts({implicit: 500});
  let textBox = await driver.findElement(By.name('my-text'));
  let submitButton = await driver.findElement(By.css('button'));
  await textBox.sendKeys('Selenium');
  console.log(title)
} finally {
  //await driver.quit();
}
  /*
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
  */
})();