/// <reference types="cypress" />
import juiceShop_Homepage from "../../../support/pageObject/juiceShop/juiceShop_Homepage"; //importing from support file under pageObject
import juiceShop_login_form from "../../../support/pageObject/juiceShop/juiceShop_login_form"; //importing from support file under pageObject


describe('login test cases (UI)', () => {

    // you can see this code in support file pageObject
    const juiceShop = new juiceShop_Homepage(); //set the function class into global variables
    const juiceShop_loginForm = new juiceShop_login_form(); //set the function class into global variables

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

        //this code belongs to support file.
        //call the function class
        juiceShop.accessHomepage();
        juiceShop.login_page();
    })

    it('login empty email field', () => {

        cy.get('#email').click();
        cy.get('#password').type(data.password);

        cy.get('#mat-error-0').should('have.text', "Please provide an email address.")
    });

    it('login unregistered/incorrect email', () => {

        //this code can find in support file under pageObject
        juiceShop_loginForm.loginForm(data.unregEmail, data.password)
        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login email w/o @ symble', () => {

        //this code can find in support file under pageObject
        juiceShop_loginForm.loginForm(envEmailWithout, data.password)
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

        //this code can find in support file under pageObject
        juiceShop_loginForm.loginForm(envEmail, data.unmatch)
        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login password less than 8 character', () => {
        //this code can find in support file under pageObject
        juiceShop_loginForm.loginForm(envEmail, data.lessPass)

        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login password more than 40 character', () => {
        //this code can find in support file under pageObject
        juiceShop_loginForm.loginForm(envEmail, data.morePass + morePassword)
        //button
        cy.get('#loginButton').click();
        //assertion
        cy.get('.error').should('have.text', 'Invalid email or password.')

    });

    it('login successfully', () => {
        //this code can find in support file under pageObject
        juiceShop_loginForm.loginForm(envEmail, data.password)

        cy.get('#loginButton').click();

        cy.wait(2000);
        cy.get('.warn-notification').contains(0);

    });

});