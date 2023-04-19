/// <reference types="cypress" />

describe("Registration", () => {

    //Global Variables
    const firstName = "Qa"
    const lastName = "Test"
    const email = "test@gmail.com"
    const companyName = "gologic"
    const number = 411111111
    const password = "Temp1234!!"

    before(() => {

        cy.log("Email" + email);
        cy.log("Password" + password);

        //url
        cy.visit("https://app.notifyre.com/login");
        cy.wait(3000);
    })

    it("sign-up", () => {

        //sign up buttob link
        cy.get('div.text-center > a').click();

        cy.signUpNotifyre({
            firstName: firstName,
            lastName: lastName,
            email: email,
            companyName: companyName,
            number: number,
            password: password
        })
       
    });
});