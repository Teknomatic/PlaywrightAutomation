const {test, expect, request} = require('@playwright/test');
const {PageObjectManager} = require('../pageObjects/PageObjectManager')

test ('TC1: Register User', async ({page}) => {
    const pageObjectManager = new PageObjectManager(page);
    const homePage = pageObjectManager.getHomePage();
    const signupLoginPage = pageObjectManager.getSignupLoginPage();
    const accountCreatedPage = pageObjectManager.getAccountCreatedPage();
    const deleteAccountPage = pageObjectManager.getDeleteAccountPage();
    
    //Signup / Login form
    await homePage.navigateTo();
    await expect(homePage.productsLoaded.last()).toBeVisible(); //verify page is visible successfully
    await homePage.signupLoginLink.click();
    await expect(signupLoginPage.newUserSignUpLabel).toBeVisible();
    await signupLoginPage.signupNameInput.fill('Test User');
    await signupLoginPage.signupEmailInput.fill('testuser@daemail33.com');
    await signupLoginPage.signupButton.click();
    //Enter Account Information
    await expect(signupLoginPage.enterAccountInformationLabel).toBeVisible();
    await signupLoginPage.mrRadio.click();
    await signupLoginPage.passwordInput.fill('Control123');
    await signupLoginPage.dayDropdown.selectOption({ label: '31' });
    await expect(signupLoginPage.dayDropdown).toHaveValue('31');
    await signupLoginPage.monthDropdown.selectOption({ label: 'December' });
    await expect(signupLoginPage.monthDropdown).toHaveValue('12');
    await signupLoginPage.yearDropdown.selectOption({ label: '2001' });
    await expect(signupLoginPage.yearDropdown).toHaveValue('2001');
    await signupLoginPage.signUpForNewsletterCheckbox.click();
    await signupLoginPage.receiveSpecialOffersCheckbox.click();
    //Address Information
    await signupLoginPage.firstNameInput.fill('Melquiades')
    await signupLoginPage.lastNameInput.fill('Do Nassimento')
    await signupLoginPage.companyInput.fill('Dos Colas Pet Store')
    await signupLoginPage.address1Input.fill('123 Casa de Campo st.')
    await signupLoginPage.address2Input.fill('Office 23')
    await signupLoginPage.countryDropdown.selectOption({ label: 'Canada' });
    await expect(signupLoginPage.countryDropdown).toHaveValue('Canada');
    await signupLoginPage.stateInput.fill('Saskatchewan');
    await signupLoginPage.cityInput.fill('Warman');
    await signupLoginPage.zipcodeInput.fill('S4P O73');
    await signupLoginPage.mobileNumberInput.fill('555-565656');
    await signupLoginPage.createAccountButton.click();
    //Account Created screen
    await expect (accountCreatedPage.accountCreatedLabel).toBeVisible();
    await accountCreatedPage.continueButton.click();
    //Logged-in as user screen
    await expect (homePage.loggedInAsUserLabel).toBeVisible();
    await homePage.deleteAccountLink.click();
    //Account Deleted screen
    await expect (deleteAccountPage.accountDeletedLabel).toBeVisible();
    await deleteAccountPage.continueButton.click();
})


test('TC2: Login user with correct email and password', async ({page}) => {
    const apiContext = await request.newContext();
    const createAccountResponse = await apiContext.post("https://automationexercise.com/api/createAccount",
        {
            multipart:{
                    name: 'Test User',
                    email: 'testuser@daemail33.com',
                    password: 'Control123',
                    title: 'Mr',
                    birth_date: '31',
                    birth_month: '12',
                    birth_year: '2001',
                    firstname: 'Melquiades',
                    lastname: 'Do Nassimento',
                    company: 'Dos Colas Pet Store',
                    address1: '123 Casa de Campo st.',
                    address2: 'Office 23',
                    country: 'Canada',
                    zipcode: 'S4P O73',
                    state: 'Saskatchewan',
                    city: 'Warman',
                    mobile_number: '555-565656'
            },
        }
    );
    const body = JSON.parse(await createAccountResponse.text());
    expect(body.responseCode).toBe(201)

    const pageObjectManager = new PageObjectManager(page);
    const homePage = pageObjectManager.getHomePage();
    const signupLoginPage = pageObjectManager.getSignupLoginPage();
    const deleteAccountPage = pageObjectManager.getDeleteAccountPage();

    await homePage.navigateTo();
    await expect(homePage.productsLoaded.last()).toBeVisible(); //verify page is visible successfully
    await homePage.signupLoginLink.click();
    //Login screen
    await expect(signupLoginPage.loginToYourAccountLabel).toBeVisible();
    await signupLoginPage.loginEmailInput.fill('testuser@daemail33.com');
    await signupLoginPage.loginPasswordInput.fill('Control123');
    await signupLoginPage.loginButton.click();
    //Logged-in as user screen
    await expect (homePage.loggedInAsUserLabel).toBeVisible();
    await homePage.deleteAccountLink.click();
    //Account Deleted screen
    await expect (deleteAccountPage.accountDeletedLabel).toBeVisible();
    await deleteAccountPage.continueButton.click();
})

test('TC3: Login User with incorrect email and password', async ({page}) => {
    const pageObjectManager = new PageObjectManager(page);
    const homePage = pageObjectManager.getHomePage();
    const signupLoginPage = pageObjectManager.getSignupLoginPage();
    const deleteAccountPage = pageObjectManager.getDeleteAccountPage();

    await homePage.navigateTo();
    await expect(homePage.productsLoaded.last()).toBeVisible();
    await homePage.signupLoginLink.click();
    //Login screen
    await expect(signupLoginPage.loginToYourAccountLabel).toBeVisible();
    await signupLoginPage.loginEmailInput.fill('invalid@daemail33.com');
    await signupLoginPage.loginPasswordInput.fill('SomeP@ss');
    await signupLoginPage.loginButton.click();
    //Error message
    await expect (signupLoginPage.YourEmailOrPasswordIsIncorrectLabel).toBeVisible();

})