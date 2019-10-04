const { Given, When, Then } = require('cucumber');
const { defineSupportCode } = require('cucumber');
const expectedCarName = "BMW i8 Coupé";
const expect = require('expect');

defineSupportCode(({ setDefaultTimeout }) => {
    setDefaultTimeout(20 * 1000);
});

Given('The BMW home page opened', function () {
    browser.manage().window().maximize();
    browser.ignoreSynchronization = true;
    return browser.get('https://www.bmw.com.au/en/index.html');
});

Then("Open discover page", function () {
    element(by.xpath("//span[text()='Hide']")).click();
    return element(by.xpath("//a[text()=' Discover ']")).click();

});

When("Open build your bmw page", function () {
    let buildOwnCarButton = element(by.xpath("//div[text()=' Build Your BMW ']"));
    browser.wait(protractor.ExpectedConditions.presenceOf(buildOwnCarButton));
    return buildOwnCarButton.click();
})

Then("Click Filter", function () {
    let filterElement = element(by.xpath("//button[@class='filter--open-filter-button ds2-tracking-js--event']"));
    browser.wait(protractor.ExpectedConditions.visibilityOf(filterElement));
    return filterElement.click();
})

When("Fill the form", function () {
    let fuelTypeButton = element(by.id("checkbox-fuelType-O"));
    browser.wait(protractor.ExpectedConditions.presenceOf(fuelTypeButton));
    fuelTypeButton.click();
    element(by.xpath("//input[@type='checkbox' and @value='convertible']")).click();
    element(by.id("checkbox-bodyTypeCode-bmw_i")).click();
    element(by.id("checkbox-bodyTypeCode-gran_coupe")).click();
    element(by.xpath("//a[@class='filter--see-results']")).click();
})

Then("Check the name of car", function () {
    let carElement = element(by.xpath("//*[@class='ds2-model-card--title ds2-no-uppercase' and contains(text(), 'BMW i8')]"));
    browser.wait(protractor.ExpectedConditions.presenceOf(carElement));
    return carElement.getText().then((actualCarName) => {
        expect(actualCarName).toEqual(expectedCarName);
    });

})