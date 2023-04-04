/// <reference types="cypress" />

describe('Forgot Password', () => {

    // calling the (environment variable / global variable) in config.js
    var envEmail = "auto" + Cypress.env("email") + "@gmail.com";
 

    //getting the json data in fixture file and fetch. 
    before(function () {
        cy.fixture('juiceShopData').then(function (data) {
            // this.data = data;
            globalThis.data = data;
        })
    });

    beforeEach(() => {

        //print email and password
        cy.log("Email: " + envEmail);
        cy.log("Password: " + data.password);

        //url
        cy.visit("http://demo.owasp-juice.shop/#/");
        cy.wait(3000);
        cy.clearCookies();

        //to click the backgroud
        cy.get('.cdk-overlay-backdrop').click();

        //To redirect in login form
        cy.get('#navbarAccount').click();
        cy.get('button#navbarLoginButton').click();

        //validate form
        cy.get('h1').should('have.text', "Login")

        //forgot password link
        cy.get('.forgot-pw').click({force: true});

    })

    it('forgot password successful', () => {

        cy.forgot(envEmail,data.securityAnswer,data.newPassword,data.repeatNewPassword,'.confirmation', "Your password was successfully changed.")
        
        cy.log("new password: " + data.newPassword)
    });
});