const faker = require("faker");
const puppeteer = require("puppeteer");

const person = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  birthday: faker.date.past(),
  hobbies: faker.lorem.word()
};

// Test form subscription
describe("subscription Form", () => {
  test("Can submit subscription form", async () => {
    let browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 250
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 900
      },
      userAgent: ""
    });
    // pupeteer can't connect to the website and performs the test :
    // "A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper
    // teardown. Try running with --runInBand --detectOpenHandles to find leaks.""
    await page.goto("http://localhost:3002/");
    // await page.goto("http://localhost:3000/"); doesn't work either
    await page.waitForSelector(".subscription-form");
    await page.click("input[name=firstName]");
    await page.type("input[name=firstName]", person.firstName);
    await page.click("input[name=lastName]");
    await page.type("input[name=lastName]", person.lastName);
    await page.click("input[name=email]");
    await page.type("input[name=email]", person.email);
    await page.click("label[id=demo-simple-select-required-label]");
    await page.type("label[id=demo-simple-select-required-label]", "male");
    await page.click("input[name=birthday]");
    await page.type("input[name=birthday]", person.birthday);
    await page.click("textare[name=hobbies]");
    await page.type("textare[name=hobbies]", person.hobbies);
    await page.click("button[type=submit]");

    browser.close();
  }, 9000000);
});
