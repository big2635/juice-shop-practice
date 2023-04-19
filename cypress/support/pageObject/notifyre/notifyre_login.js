class notifyre_login {

    accessHomepage() {
        //url
        cy.visit("https://app.notifyre.com/login");
        cy.wait(3000);
        cy.clearCookies();
    }

    notifyreLoginForm(email, password) {

        cy.get('#mat-input-0').type(email);
        cy.xpath('//app-external-card//form/button').click();
        cy.get('#mat-input-1').type(password);
        cy.xpath('//app-external-card//form/button').click();

    }
}
export default notifyre_login;