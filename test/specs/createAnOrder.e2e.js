const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

// TEST 1. Setting the address  
 it('Should select an address when creating an order', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

//TEST 2. Selecting Supportive plan
  it('Should select a Supportive plan when creating an order', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        await expect($(page.supportiveButton)).toBeExisting();
    })

// TEST 3. Filling in the phone number  
  it('Should fill in the phone number when creating an order', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const phoneNumberButton = await $(page.phoneNumberButton);
    await phoneNumberButton.waitForDisplayed();
    await phoneNumberButton.click();
    const pnoneNumberModal = await $(page.phoneNumberModal);
    await expect(pnoneNumberModal).toBeExisting();
})

// TEST 4. Adding a credit card
  it('Should add a credit card number when creating an order', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.addPaymentMethodCard('123456789122','12');
    const cardPaymentMethodAdded = await $(page.cardPaymentMethodAdded);
    await cardPaymentMethodAdded.waitForDisplayed();
    await expect(cardPaymentMethodAdded).toBeExisting();
})

// TEST 5. Writing a message for the driver  
 it('Should write a message for the driver when creating an order', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const messageToDriverField = await $(page.messageToDriverField);
    await messageToDriverField.waitForDisplayed();
    await messageToDriverField.setValue("Waiting for you");
    await expect(messageToDriverField).toHaveValue("Waiting for you");
})

// TEST 6. Ordering a Blanket and handkerchiefs 
  it('Should order a Blanket and handkerchiefs', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const supportiveButton = await $(page.supportiveButton);
    await supportiveButton.waitForDisplayed();
    await supportiveButton.click();
    const orderBlanketAndHandkerchiefs = await $(page.orderBlanketAndHandkerchiefs)
    await orderBlanketAndHandkerchiefs.waitForDisplayed();
    await orderBlanketAndHandkerchiefs.click();
    await expect ($(page.orderBlanketAndHandkerchiefs).toBeChecked());
})

// TEST 7. Ordering 2 Ice creams  
  it('Should order 2 Ice creams', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const supportiveButton = await $(page.supportiveButton);
    await supportiveButton.waitForDisplayed();
    await supportiveButton.click();
    const addIceCream = await $(page.addIceCream);
    await addIceCream.waitForDisplayed();
    await addIceCream.click();
    await addIceCream.click();
    const iceCreamCount = await $(page.iceCreamCount);
    await iceCreamCount.waitForDisplayed();
    await expect(iceCreamCount).toBeExisting();
})

// TEST 8. The car search modal appears 
  it('Should make the car search appears', async () => {
    await browser.url(`/`)
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.submitPhoneNumber('+11234567897');
    const messageToDriverField = await $(page.messageToDriverField);
    await messageToDriverField.waitForDisplayed();
    await messageToDriverField.setValue("Waiting for you");
    const OrderCarButton = await $(page.OrderCarButton);
    await OrderCarButton.waitForDisplayed();
    await OrderCarButton.click();
    const carModel = await $(page.carModel);
    await carModel.waitForDisplayed({ timeout: 40000 });
    await expect(carModel).toBeExisting();
})

})