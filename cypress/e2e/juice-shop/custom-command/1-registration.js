/// <reference types="cypress" />

describe('Registration', () => {

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

            //url
            cy.visit("http://demo.owasp-juice.shop/#/");
            cy.wait(3000);
            cy.clearCookies();

            //to click the backgroud
            cy.get('.cdk-overlay-backdrop').click();
            //To redirect in registration form
            cy.get('#navbarAccount').click();
            cy.get('button#navbarLoginButton').click();
            cy.get('#newCustomerLink').contains("Not yet a customer?").click()

            //confirm the text label
            cy.get('h1').should('have.text', "User Registration");
            cy.get('#mat-hint-0 > em').should('have.text', 'Password must be 5-40 characters long.')
            cy.get('#mat-hint-3 > em').should('have.text', 'This cannot be changed later!')
            cy.get('.primary-link').should('have.text', 'Already a customer?')

        })

        it("empty email field", () => {

            cy.signup(" ", data.password, data.repassword, data.securityAnswer);
            //assertion to error message
            cy.get('#mat-error-7').should('have.text', "Email address is not valid.");

        });

        it("email without @ symble", () => {

            cy.signup(envEmailWithout, data.password, data.repassword, data.securityAnswer);
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

            cy.signup(envEmail, data.password, data.unmatch, data.securityAnswer);
            // cy.wait(3000)
            // //assertion to error message
            cy.get('#mat-error-10').contains("Passwords do not match")
        });

        it("less than 5 character password", () => {

            cy.signup(envEmail, data.lessPass, data.lessPass, data.securityAnswer);
            //cy.wait(3000)
            //assertion to error message
            cy.get('#mat-error-9').contains('Password must be 5-40 characters long.');
        });

        it("more than 40 character password", () => {

            cy.signup(envEmail, data.morePass + morePassword, data.morePass + morePassword, data.securityAnswer);
            // cy.wait(3000)
            //assertion to error message
            cy.get('#mat-error-10').contains('Password must be 5-40 characters long.');


        });

        it('registered successfully', () => {

            cy.signup(envEmail, data.password, data.repassword, data.securityAnswer);
            cy.get('#registerButton').click();

            //alert text
            cy.get('.mat-simple-snack-bar-content').should("have.text", 'Registration completed successfully. You can now log in.')

            // cy.wrap(envEmail).as("newEmail")

            // cy.log("email: " + "@newEmail")
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