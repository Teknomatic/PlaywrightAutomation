class SignupLoginPage {

    constructor(page) {
        this.page = page;
        //Login to your account
        this.loginToYourAccountLabel = page.getByRole('heading', { name: 'Login to your account'});
        this.loginEmailInput = page.getByTestId('login-email');
        this.loginPasswordInput = page.getByTestId('login-password');
        this.loginButton = page.getByTestId('login-button');
        this.YourEmailOrPasswordIsIncorrectLabel = page.getByText('Your email or password is incorrect!', { exact: true });
        //New User Signup
        this.newUserSignUpLabel = page.getByRole('heading', { name: 'New User Signup!'});
        this.signupNameInput = page.getByTestId('signup-name');
        this.signupEmailInput = page.getByTestId('signup-email');
        this.signupButton = page.getByTestId('signup-button');
        //Signup form locators
        this.signupFormLoaded = page.locator('#form');
        this.enterAccountInformationLabel = page.getByRole('heading', { name: 'Enter Account Information'});
        this.mrRadio = page.locator('#uniform-id_gender1');
        this.mrsRadio = page.locator('#uniform-id_gender2');
        this.nameInput = page.getByTestId('name');
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.dayDropdown = page.getByTestId('days');
        this.monthDropdown = page.getByTestId('months');
        this.yearDropdown = page.getByTestId('years');
        this.signUpForNewsletterCheckbox = page.locator('#newsletter');
        this.receiveSpecialOffersCheckbox = page.locator('#optin');
        // Address Information locators
        this.firstNameInput = page.getByTestId('first_name');
        this.lastNameInput = page.getByTestId('last_name');
        this.companyInput = page.getByTestId('company');
        this.address1Input = page.getByTestId('address');
        this.address2Input = page.getByTestId('address2');
        this.countryDropdown = page.getByTestId('country');
        this.stateInput = page.getByTestId('state');
        this.cityInput = page.getByTestId('city');
        this.zipcodeInput = page.getByTestId('zipcode');
        this.mobileNumberInput = page.getByTestId('mobile_number');
        this.createAccountButton = page.getByTestId('create-account');
    }
}
module.exports = {SignupLoginPage};