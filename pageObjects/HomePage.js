class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginLink = page.locator("a[href='/login']");
        this.productsLoaded = page.getByRole('link', { name: 'View Product'}) // returns all 34 labels
        this.deleteAccountLink = page.locator("a[href='/delete_account']");
        this.loggedInAsUserLabel = page.getByText('Logged in as Test User', { exact: true });
    }

    async navigateTo() {
        await this.page.goto("https://automationexercise.com/");
    }
}
module.exports = {HomePage};