/// <reference types="cypress" />

describe("Juice Shop via demo", () => {

    //Global Variables
    let randomString = Math.random().toString(36).substring(2);
    const email = "temp" + randomString + "@gmail.com"
    const emailWithoutAT = "tempgmail.com"
    const unregEmail = "temp1234@gmail.com"
    const password = "Password1";
    const repass = "Password1";
    const unmatch = "123456781qwerty"
    const lessPass = "1234"
    const morePass = "Temp" + randomString + randomString + randomString + randomString
    const securityAnswer = "Hello world";

    describe('sign-up test cases (UI)', () => {
        beforeEach(() => {

            cy.log("Email: " + email);
            cy.log("Password: " + password);

            //url
            cy.visit("http://demo.owasp-juice.shop/#/");
            cy.wait(3000);

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

            cy.get('#emailControl').type(" ");
            cy.get('#passwordControl').type(password);
            cy.get('#repeatPasswordControl').type(repass);

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type(securityAnswer);
            //assertion to error message
            cy.get('#mat-error-7').should('have.text', "Email address is not valid.");


        });

        it("email without @ symble", () => {
            cy.get('#emailControl').type(emailWithoutAT);
            cy.get('#passwordControl').type(password);
            cy.get('#repeatPasswordControl').type(repass);

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type(securityAnswer);

            //assertion to error message
            cy.get('#mat-error-7').should('have.text', "Email address is not valid.");
        });

        it("empty password field", () => {

            //text input
            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').click();;
            cy.get('#repeatPasswordControl').type(password);


            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type("Hello world");

            cy.wait(5000);
            //assertion to error message
            cy.get('#mat-error-3').contains("Please provide a password.");
            cy.get('#mat-error-9').contains("Passwords do not match");

        });

        it("empty repeat password field", () => {

            //text input
            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').type(password);
            cy.get('#repeatPasswordControl').click();

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type("Hello world");

            cy.wait(5000);
            //assertion to error message
            cy.get('#mat-error-4').contains("Please repeat your password.");
        });

        it("unmatch password", () => {

            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').type(password);
            cy.get('#repeatPasswordControl').type(unmatch);

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type(securityAnswer);
            //assertion to error message
            cy.get('#mat-error-10').contains("Passwords do not match")
        });

        it("less than 5 character password", () => {

            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').type(lessPass);
            cy.get('#repeatPasswordControl').type(lessPass);

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type(securityAnswer);
            //assertion to error message
            cy.get('#mat-error-9').contains('Password must be 5-40 characters long.');


        });

        it("more than 40 character password", () => {

            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').type(morePass);
            cy.get('#repeatPasswordControl').type(morePass);

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type(securityAnswer);
            //assertion to error message
            cy.get('#mat-error-10').contains('Password must be 5-40 characters long.');


        });

        it("email successful register", () => {

            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').type(password);
            cy.get('#repeatPasswordControl').type(repass);

            //drop down list
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option:nth-of-type(2)').click();
            cy.get('#securityAnswerControl').type(securityAnswer);

            cy.get('#registerButton').click();

            //alert text
            cy.get('.mat-simple-snack-bar-content').should("have.text", 'Registration completed successfully. You can now log in.')
        });

    });

    describe('API-testing (non-UI)', () => {
        //json data
        const userCredentials = {
            "email": email,
            "password": password
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

            //prpducts
            cy.get(".mat-grid-list [rowspan='1']:nth-of-type(1)").click();
            cy.get('.close-dialog').click()
            cy.get(".mat-grid-list [rowspan='1']:nth-of-type(2)").click();
            cy.get('.close-dialog').click()
            cy.get(".mat-grid-list [rowspan='1']:nth-of-type(3)").click();
            cy.get('.close-dialog').click()


            //network-request checking the xhr get request for basket
            cy.intercept({ //to enter the url
                method: "GET",
                url: "**/basket/*",
            }, {
                body: //json data
                {
                    "status": "success",
                    "data": {
                        "id": 14,
                        "Products": [{
                                "id": 1,
                                "name": "Apple Juice (1000ml)",
                                "description": "The all-time classic.",
                                "price": 1.99,
                                "deluxePrice": 0.99,
                            },
                            {
                                "id": 24,
                                "name": "Apple Pomace",
                                "description": "Finest pressings of apples. Allergy disclaimer: Might contain traces of worms. Can be <a href=\"/#recycle\">sent back to us</a> for recycling.",
                                "price": 0.89,
                                "deluxePrice": 0.89,
                            },
                            {
                                "id": 6,
                                "name": "Banana Juice (1000ml)",
                                "description": "Monkeys love it the most.",
                                "price": 1.99,
                                "deluxePrice": 1.99,

                            }
                        ]
                    }
                }
            }).as("getBasket"); //alias

            //basket
            cy.get("[routerlink='\/basket']").click();
            cy.reload();
            cy.wait('@getBasket').its("response.statusCode").should("eq", 200); //status

        });
    });

    describe('login test cases (UI)', () => {

        beforeEach(() => {

            //print email and password
            cy.log("Email: " + email);
            cy.log("Password: " + password);

            //url
            cy.visit("http://demo.owasp-juice.shop/#/");
            cy.wait(3000);

            //to click the backgroud
            cy.get('.cdk-overlay-backdrop').click();

            //To redirect in login form
            cy.get('#navbarAccount').click();
            cy.get('button#navbarLoginButton').click();

            //validate form
            cy.get('h1').should('have.text', "Login")

        })

        it('login empty email field.', () => {

            cy.get('#email').click();
            cy.get('#password').type(password);

            cy.get('#mat-error-0').should('have.text', "Please provide an email address.")
        });

        it('login unregistered/incorrect email', () => {

            cy.get('#email').type(unregEmail);
            cy.get('#password').type(password);


            cy.get('#loginButton').click();

            cy.get('.error').should('have.text', 'Invalid email or password.')


        });

        it('login email w/o @ symble', () => {

            cy.get('#email').type(emailWithoutAT);
            cy.get('#password').type(password);

            cy.get('#loginButton').click();

            cy.get('.error').should('have.text', 'Invalid email or password.')


        });

        it('login empty password field', () => {


            cy.get('#email').type(email);
            cy.get('#password').click();

            //title
            cy.get('h1').click();

            cy.get('#mat-error-1').should('have.text', "Please provide a password.");

        });

        it('login unregistered/incorrect password', () => {

            cy.get('#email').type(unregEmail);
            cy.get('#password').type(password);

            cy.get('#loginButton').click();

            cy.get('.error').should('have.text', 'Invalid email or password.')


        });

        it('login password less than 8 character', () => {

            cy.get('#email').type(email);
            cy.get('#password').type(lessPass);

            cy.get('#loginButton').click();

            cy.get('.error').should('have.text', 'Invalid email or password.')

        });

        it('login password more than 40 character', () => {

            cy.get('#email').type(email);
            cy.get('#password').type(morePass);

            cy.get('#loginButton').click();

            cy.get('.error').should('have.text', 'Invalid email or password.')

        });


        it('login successfully', () => {

            cy.get('#email').type(email);
            cy.get('#password').type(password);

            cy.get('#loginButton').click();

            cy.wait(2000);
            cy.get('.warn-notification').contains(0);

        });
    });

});