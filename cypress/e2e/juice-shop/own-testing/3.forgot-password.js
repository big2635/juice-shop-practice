/// <reference types="cypress" />
import juiceShop_Homepage from "../../../support/pageObject/juiceShop/juiceShop_Homepage"; //importing from support file under pageObject
import juiceShop_forgot_password from "../../../support/pageObject/juiceShop/juiceShop_forgot_password"; //importing from support file under pageObject

describe('Forgot Password', () => {

    // you can see this code in support file pageObject
    const juiceShop = new juiceShop_Homepage(); //set the function class into global variables
    const juiceShop_forgotPassword = new juiceShop_forgot_password(); //set the function class into global variables

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

        juiceShop.accessHomepage();
        juiceShop.login_page();
        //forgot password link
        cy.get('.forgot-pw').click({force: true});

    })

    it('forgot password successful', () => {

        juiceShop_forgotPassword.forgotPasssword(envEmail,data.securityAnswer,data.newPassword,data.repeatNewPassword,'.confirmation', "Your password was successfully changed.")
        
        cy.log("new password: " + data.newPassword)
    });
});