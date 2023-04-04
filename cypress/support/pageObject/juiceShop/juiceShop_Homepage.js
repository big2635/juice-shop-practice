class juiceShop_Homepage {

    accessHomepage() {
        //url
        cy.visit("http://demo.owasp-juice.shop/#/");
        cy.wait(3000);
        cy.clearCookies();
    }

    login_page() {
        //to click the backgroud
        cy.get('.cdk-overlay-backdrop').click();
        //To redirect in login form
        cy.get('#navbarAccount').click();
        cy.get('button#navbarLoginButton').click();
    }

    registration_page() {
        //To redirect in registration form
        cy.get('#newCustomerLink').contains("Not yet a customer?").click()
        //confirm the text label
        cy.get('h1').should('have.text', "User Registration");
        cy.get('#mat-hint-0 > em').should('have.text', 'Password must be 5-40 characters long.')
        cy.get('#mat-hint-3 > em').should('have.text', 'This cannot be changed later!')
        cy.get('.primary-link').should('have.text', 'Already a customer?')
    }
}
export default juiceShop_Homepage;