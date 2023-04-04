/// <reference types="cypress" />


describe('login test cases (UI)', () => {

    // calling the (environment variable / global variable) in config.js
    var envEmail = "auto" + Cypress.env("email") + "@gmail.com";
    var envEmailWithout = "auto" + Cypress.env("email") + "gmail.com";
    var morePassword = Cypress.env("email") + Cypress.env("email") + Cypress.env("email") + Cypress.env("email")

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

    })

    it('login empty email field', () => {

        cy.get('#email').click();
        cy.get('#password').type(data.password);

        cy.get('#mat-error-0').should('have.text', "Please provide an email address.")
    });

    it('login unregistered/incorrect email', () => {

        cy.login(data.unregEmail, data.password)

        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login email w/o @ symble', () => {

        cy.login(envEmailWithout, data.password)
        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')


    });

    it('login empty password field', () => {

        cy.get('#email').type(envEmail);
        cy.get('#password').click();

        //title
        cy.get('h1').click();

        cy.get('#mat-error-1').should('have.text', "Please provide a password.");

    });

    it('login unregistered/incorrect password', () => {

        cy.login(envEmail, data.unmatch)
        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login password less than 8 character', () => {

        cy.login(envEmail, data.lessPass)
        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login password more than 40 character', () => {

        cy.login(envEmail, data.morePass + morePassword)
        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login successfully', () => {    

        cy.login(envEmail, data.password)

        cy.get('#loginButton').click();

        cy.wait(2000);
        cy.get('.warn-notification').contains(0);

    });

});