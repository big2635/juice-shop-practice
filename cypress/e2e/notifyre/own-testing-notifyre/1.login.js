/// <reference types="cypress" />

import notifyre_login from "../../../support/pageObject/notifyre/notifyre_login"; //importing from support file under pageObject

describe('login test cases (UI)', () => {

    // you can see this code in support file pageObject
    const login_notifyre = new notifyre_login(); //set the function class into global variables

    //getting the json data in fixture file and fetch. 
    before(function () {
        cy.fixture('loginNotifyre').then(function (data) {
            // this.data = data;
            globalThis.data = data;
        })
    });

    beforeEach(() => {

        //print email and password
        cy.log("Email: " + data.email);
        cy.log("Password: " + data.password);

        //this code belongs to support file.
        //call the function class
        login_notifyre.accessHomepage();

    })

    it('login successfully', () => {
        //this code can find in support file under pageObject
        login_notifyre.notifyreLoginForm(data.email, data.password)

        cy.clearCookies();
        cy.wait(5000);

        cy.get('.text-title > b').should('have.text', "Welcome to Notifyre");

    });

});