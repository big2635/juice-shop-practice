/// <reference types="cypress" />

describe('login page', () => {

    //getting the json data in fixture file and fetch. 
    before(function () {
        cy.fixture('sendingFax').then(function (data) {
            // this.data = data;
            globalThis.data = data;
        })
    });

    beforeEach(() => {
        //url
        cy.visit("https://app.notifyre.com/login");
        cy.wait(3000);
        cy.clearCookies();
    })

    it('forgot password', () => {

        cy.get('.ng-untouched .text-caption').click();
        cy.url().should('include', "forgot-password");

    });

    it('unsuccessful', () => {

        cy.loginToNotifyre(data.email, data.incorrectPass)

        cy.get('.error-message-box').should('have.text', "The email address or password you entered is incorrect");


    });

    it('successful', () => {

        cy.loginToNotifyre(data.email, data.password)

        cy.clearCookies();
        cy.wait(5000);

        cy.get('.text-title > b').should('have.text', "Welcome to Notifyre");

    });


});