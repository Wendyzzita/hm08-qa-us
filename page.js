module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    inputCardNumber: '//*[@id="number"]',
    inputCodeNumber: '//*[@name="code"]',
    messageToDriverField: '//*[@id="comment"]',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    supportiveButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[5]/div[1]/img',
    paymentMethodButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]/div[1]',
    addCard: '//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]/div[2]',
    addCardTitle: '//*[@id="root"]/div/div[2]/div[2]/div[2]/div',
    linkCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    closeCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/button',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    orderBlanketAndHandkerchiefs: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div/span',
    openOrderRequirements: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[1]/div[1]',
    addIceCream: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[3]',
    OrderCarButton: '//*[@id="root"]/div/div[3]/div[4]',
    // Modals
    phoneNumberModal: '.modal',
    // Others
    cardPaymentMethodAdded: 'img[alt="card"]',
    carModel: '//*[@id="root"]/div/div[5]/div[2]/div[1]/div/div[2]/img',
    iceCreamCount: '.counter-value=2',
    DriverInformation: '//*[@id="root"]/div/div[5]/div[2]/div[2]/div[1]/div[1]/div[1]/img',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addPaymentMethodCard: async function(number,code) {
        // Select Payment Method
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        // Select Add Card as payment option
        const addCard = await $(this.addCard);
        await addCard.waitForDisplayed();
        await addCard.click();
        // Input the card number
        const inputCardNumber = await $(this.inputCardNumber);
        await inputCardNumber.setValue(number);
        // Input the code for the card
        const inputCodeNumber = await $(this.inputCodeNumber);
        await inputCodeNumber.setValue(code);
        // Click in Card title
        const addCardTitle = await $(this.addCardTitle);
        await addCardTitle.waitForDisplayed();
        await addCardTitle.click();
        // Clicl in Linked Card Button
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();
        // Close the Payment option windown
        const closeCardButton = await $(this.closeCardButton);
        await closeCardButton.waitForDisplayed();
        await closeCardButton.click();
    },
};