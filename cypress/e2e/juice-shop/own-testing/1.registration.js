/// <reference types="cypress" />
import juiceShop_Homepage from "../../../support/pageObject/juiceShop/juiceShop_Homepage"; //importing from support file under pageObject
import juiceShop_registratiion_form from "../../../support/pageObject/juiceShop/juiceShop_registration_form"; //importing from support file under pageObject

describe('Registration', () => {

    // you can see this code in support file pageObject
    const juiceShop = new juiceShop_Homepage(); //set the function class into global variables
    const registrationForm = new juiceShop_registratiion_form(); //set the function class into global variables

    // calling the (environment variable / global variable) in config.js
    var envEmail = "auto" + Cypress.env("email") + "@gmail.com";
    var envPass = Cypress.env("nonUIPassword")
    var envEmailWithout = "auto" + Cypress.env("email") + "gmail.com";
    var morePassword = Cypress.env("email") + Cypress.env("email") + Cypress.env("email") + Cypress.env("email")

    describe('sign-up test cases (UI)', () => {

        //getting the json data in fixture file and fetch. 
        before(function () {
            cy.fixture('juiceShopData').then(function (data) {
                // this.data = data;
                globalThis.data = data;
            })
        });
        // hooks to URL
        beforeEach(() => {
            cy.log("Email: " + envEmail);
            cy.log("Password: " + data.password);


            //this code belongs to support file.
            //call the function class
            juiceShop.accessHomepage();
            juiceShop.login_page();
            juiceShop.registration_page();

        })

        it("empty email field", () => {

            //this code can find in support file under pageObject
            registrationForm.registrationForm(" ", data.password, data.repassword, data.securityAnswer)
            //assertion to error message
            cy.get('#mat-error-7').should('have.text', "Email address is not valid.");

        });

        it("email without @ symble", () => {
            //this code can find in support file under pageObject
            registrationForm.registrationForm(envEmailWithout, data.password, data.repassword, data.securityAnswer)
            //assertion to error message
            cy.get('#mat-error-7').should('have.text', "Email address is not valid.");

        });

        it("empty password field", () => {

            //text input
            cy.get('#emailControl').type(envEmail);
            cy.get('#passwordControl').click();
            cy.get('#repeatPasswordControl').type(data.repassword);

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type(data.securityAnswer);

            //assertion to error message
            cy.get('#mat-error-3').contains("Please provide a password.");
            cy.get('#mat-error-9').contains("Passwords do not match");

        });

        it("empty repeat password field", () => {

            //text input
            cy.get('#emailControl').type(envEmail);
            cy.get('#passwordControl').type(data.password);
            cy.get('#repeatPasswordControl').click();

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type("Hello world");

            //assertion to error message
            cy.get('#mat-error-4').contains("Please repeat your password.");
        });

        it("unmatch password", () => {
            //this code can find in support file under pageObject
            registrationForm.registrationForm(envEmail, data.password, data.unmatch, data.securityAnswer)
            // //assertion to error message
            cy.get('#mat-error-10').contains("Passwords do not match")
        });

        it("less than 5 character password", () => {
            //this code can find in support file under pageObject
            registrationForm.registrationForm(envEmail, data.lessPass, data.lessPass, data.securityAnswer)
            //assertion to error message
            cy.get('#mat-error-9').contains('Password must be 5-40 characters long.');
        });

        it("more than 40 character password", () => {
            //this code can find in support file under pageObject
            registrationForm.registrationForm(envEmail, data.morePass + morePassword, data.morePass + morePassword, data.securityAnswer)
            //assertion to error message
            cy.get('#mat-error-10').contains('Password must be 5-40 characters long.');
        });

        it('registered successfully', () => {
            //this code can find in support file under pageObject
            registrationForm.registrationForm(envEmail, data.password, data.repassword, data.securityAnswer)
            cy.get('#registerButton').click();

            //alert text
            cy.get('.mat-simple-snack-bar-content').should("have.text", 'Registration completed successfully. You can now log in.')
        });
    });

    describe('API-testing (non-UI)', () => {

        //json data
        const userCredentials = {
            "email": envEmail,
            "password": envPass //non-UI 
        }

        it('Test login via API (non-UI)', () => {
            //http URL
            cy.request({
                method: "POST",
                url: "http://demo.owasp-juice.shop/rest/user/login",
                body: userCredentials

            }).then(response => {
                expect(response.status).to.eql(200) //assertion of status
            })

        });

        it('Test login via token (non-UI)', () => {
            //http URL
            cy.request({
                method: "POST",
                url: "http://demo.owasp-juice.shop/rest/user/login",
                body: userCredentials
            }).its('body').then(body => {
                const token = body.authentication.token //find the unique token 
                cy.wrap(token).as("userToken") //alias

                const userToken = cy.log("@userToken") //output of token

                cy.visit("http://demo.owasp-juice.shop/#/", {
                    onBeforeLoad(browser) {
                        browser.localStorage.setItem("token", userToken)
                    }
                })
                cy.wait(2000);
                cy.get('.cdk-overlay-backdrop').click(-50, -50, {
                    force: true
                });
                cy.get('.warn-notification').contains(0);
            })
        });


    });

});