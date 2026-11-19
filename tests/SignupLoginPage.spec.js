const {test, expect} = require('@playwright/test');
const { createAccount } = require('../utils/createAccountApi');
const { deleteAccount } = require('../utils/deleteAccountApi');
const testUser = require('../testData/testUser');
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
    await signupLoginPage.signupNameInput.fill(testUser.name);
    await signupLoginPage.signupEmailInput.fill(testUser.email);
    await signupLoginPage.signupButton.click();
    //Enter Account Information
    await expect(signupLoginPage.enterAccountInformationLabel).toBeVisible();
    await signupLoginPage.mrRadio.click();
    await signupLoginPage.passwordInput.fill(testUser.password);
    await signupLoginPage.dayDropdown.selectOption({ label: testUser.birth_date });
    await expect(signupLoginPage.dayDropdown).toHaveValue(testUser.birth_date);
    await signupLoginPage.monthDropdown.selectOption({ label: testUser.birth_month_label });
    await expect(signupLoginPage.monthDropdown).toHaveValue(testUser.birth_month);
    await signupLoginPage.yearDropdown.selectOption({ label: testUser.birth_year });
    await expect(signupLoginPage.yearDropdown).toHaveValue(testUser.birth_year);
    await signupLoginPage.signUpForNewsletterCheckbox.click();
    await signupLoginPage.receiveSpecialOffersCheckbox.click();
    //Address Information
    await signupLoginPage.firstNameInput.fill(testUser.firstname)
    await signupLoginPage.lastNameInput.fill(testUser.lastname)
    await signupLoginPage.companyInput.fill(testUser.company)
    await signupLoginPage.address1Input.fill(testUser.address1)
    await signupLoginPage.address2Input.fill(testUser.address2)
    await signupLoginPage.countryDropdown.selectOption({ label: testUser.country });
    await expect(signupLoginPage.countryDropdown).toHaveValue(testUser.country);
    await signupLoginPage.stateInput.fill(testUser.state);
    await signupLoginPage.cityInput.fill(testUser.city);
    await signupLoginPage.zipcodeInput.fill(testUser.zipcode);
    await signupLoginPage.mobileNumberInput.fill(testUser.mobile_number);
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


test('TC2: Login user with correct email and password', async ({page, request}) => {
    // Create a user via API 
    const responseCreate = await createAccount(request, testUser);
    expect(responseCreate.ok()).toBeTruthy();
    const bodyCreate = await responseCreate.json();
    expect(bodyCreate.responseCode).toBe(201);

    const pageObjectManager = new PageObjectManager(page);
    const homePage = pageObjectManager.getHomePage();
    const signupLoginPage = pageObjectManager.getSignupLoginPage();
    const deleteAccountPage = pageObjectManager.getDeleteAccountPage();

    await homePage.navigateTo();
    await expect(homePage.productsLoaded.last()).toBeVisible(); //verify page is visible successfully
    await homePage.signupLoginLink.click();
    //Login screen
    await expect(signupLoginPage.loginToYourAccountLabel).toBeVisible();
    await signupLoginPage.loginEmailInput.fill(testUser.email);
    await signupLoginPage.loginPasswordInput.fill(testUser.password);
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

    await homePage.navigateTo();
    await expect(homePage.productsLoaded.last()).toBeVisible();
    await homePage.signupLoginLink.click();
    //Login screen
    await expect(signupLoginPage.loginToYourAccountLabel).toBeVisible();
    await signupLoginPage.loginEmailInput.fill('invalid@daemail33.com');
    await signupLoginPage.loginPasswordInput.fill('SomeP@ss');
    await signupLoginPage.loginButton.click();
    //Error message
    await expect (signupLoginPage.yourEmailOrPasswordIsIncorrectLabel).toBeVisible();

})

test('TC4: Logout User', async ({page, request}) => {
    // Create a user via API 
    const responseCreate = await createAccount(request, testUser);
    expect(responseCreate.ok()).toBeTruthy();
    const bodyCreate = await responseCreate.json();
    expect(bodyCreate.responseCode).toBe(201);

    const pageObjectManager = new PageObjectManager(page);
    const homePage = pageObjectManager.getHomePage();
    const signupLoginPage = pageObjectManager.getSignupLoginPage();

    await homePage.navigateTo();
    await expect(homePage.productsLoaded.last()).toBeVisible();
    await homePage.signupLoginLink.click();
    //Login screen
    await expect(signupLoginPage.loginToYourAccountLabel).toBeVisible();
    await signupLoginPage.loginEmailInput.fill(testUser.email);
    await signupLoginPage.loginPasswordInput.fill(testUser.password);
    await signupLoginPage.loginButton.click();
    //Logged in message
    await expect (homePage.loggedInAsUserLabel).toBeVisible();
    // Logout action
    await homePage.logoutLink.click();
    await expect(signupLoginPage.loginToYourAccountLabel).toBeVisible();

    //Delete test account via API
    const accountToDelete = {
                    email: testUser.email,
                    password: testUser.password
            };
    const responseDelete = await deleteAccount(request, accountToDelete);
    expect(responseDelete.ok()).toBeTruthy();
    const bodyDelete = await responseDelete.json();
    expect(bodyDelete.responseCode).toBe(200);
})

test('TC5: Register User with existing email', async ({page, request}) => {
    // Create a user via API 
    const responseCreate = await createAccount(request, testUser);
    expect(responseCreate.ok()).toBeTruthy();
    const bodyCreate = await responseCreate.json();
    expect(bodyCreate.responseCode).toBe(201);

    const pageObjectManager = new PageObjectManager(page);
    const homePage = pageObjectManager.getHomePage();
    const signupLoginPage = pageObjectManager.getSignupLoginPage();

    //Signup / Login form
    await homePage.navigateTo();
    await expect(homePage.productsLoaded.last()).toBeVisible(); //verify page is visible successfully
    await homePage.signupLoginLink.click();
    await expect(signupLoginPage.newUserSignUpLabel).toBeVisible();
    await signupLoginPage.signupNameInput.fill(testUser.name);
    await signupLoginPage.signupEmailInput.fill(testUser.email);
    await signupLoginPage.signupButton.click();
    //Error message
    await expect (signupLoginPage.emailAddressAlreadyExistsLabel).toBeVisible();

    //Delete test account via API
    const accountToDelete = {
                    email: testUser.email,
                    password: testUser.password
            };
    const responseDelete = await deleteAccount(request, accountToDelete);
    expect(responseDelete.ok()).toBeTruthy();
    const bodyDelete = await responseDelete.json();
    expect(bodyDelete.responseCode).toBe(200);
})
