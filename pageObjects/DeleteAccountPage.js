class DeleteAccountPage {
    constructor(page) {
        this.page = page;
        this.continueButton = page.getByTestId('continue-button');
        this.accountDeletedLabel = page.getByTestId('account-deleted');
    }
}
module.exports = {DeleteAccountPage};