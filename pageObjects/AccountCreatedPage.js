class AccountCreatedPage {
    constructor(page) {
        this.page = page;
        this.continueButton = page.getByTestId('continue-button');
        this.accountCreatedLabel = page.getByTestId('account-created');
    }
}
module.exports = {AccountCreatedPage};