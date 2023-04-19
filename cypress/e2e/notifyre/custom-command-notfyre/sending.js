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
        
        //print email and password
        cy.log("Email: " + data.email);
        cy.log("Password: " + data.password);

        cy.clearCookies();
        cy.visit("https://app.notifyre.com/login");
        cy.wait(3000);
    })

    it('successful', () => {

        cy.loginToNotifyre(data.email, data.password)

        cy.wait(5000);
        //assertion
        cy.get('.text-title > b').should('have.text', "Welcome to Notifyre");
        cy.get('.text-note > .mat-button-wrapper').click();

        cy.sendingTheFax(data.number, data.message)
    });


});