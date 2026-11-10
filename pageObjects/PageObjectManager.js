const {HomePage} = require('./HomePage');
const {SignupLoginPage} = require('./SignupLoginPage');
const {AccountCreatedPage} = require('./AccountCreatedPage');
const {DeleteAccountPage} = require('./DeleteAccountPage');

class PageObjectManager {
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.signupLoginPage = new SignupLoginPage(this.page);
        this.accountCreatedPage = new AccountCreatedPage(this.page);
        this.deleteAccountPage = new DeleteAccountPage(this.page);
    }

    getHomePage(){
        return this.homePage;
    }

    getSignupLoginPage(){
        return this.signupLoginPage;
    }

    getAccountCreatedPage(){
        return this.accountCreatedPage;
    }

    getDeleteAccountPage(){
        return this.deleteAccountPage;
    }
}
module.exports = {PageObjectManager}