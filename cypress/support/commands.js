// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent commacleand --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//sign-up juice shop                     //passing a variables
Cypress.Commands.add('signup', (email,password,repass,securityAnswer) => {
    //text input
    cy.get('#emailControl').type(email);
    cy.get('#passwordControl').type(password);
    cy.get('#repeatPasswordControl').type(repass);

    //drop down list
    cy.get('.mat-select-arrow').click();
    cy.get('mat-option:nth-of-type(2)').click();
    cy.get('#securityAnswerControl').type(securityAnswer);
});

//login juice shop         //passing a variables
Cypress.Commands.add('login', (email,password) => {
    
    cy.get('#email').type(email);
    cy.get('#password').type(password);

});

//forgot-password juice shop  //passing a variables
Cypress.Commands.add('forgot', (email,answer,newPassword,repeatNewPassword,$selector,textToLocate) => {
    
    cy.get('#email').type(email);
    cy.get('#securityAnswer').type(answer);
    cy.get('#newPassword').type(newPassword);
    cy.get('#newPasswordRepeat').type(repeatNewPassword);
    cy.get('#resetButton').click();
    cy.get($selector).contains(textToLocate)

});


// Cypress.Commands.add('webdriverUni_ContactForm', (firstName, lastName, email, comment, $selector, textToLocate) => {
//     cy.get('[name="first_name"]').type(firstName)
//     cy.get('[name="last_name"]').type(lastName)
//     cy.get('[name="email"]').type(email)
//     cy.get('textarea.feedback-input').type(comment)
//     cy.get('[type="submit"]').click()
//     cy.get($selector).contains(textToLocate)
// })


//notifyre
Cypress.Commands.add('signUpNotifyre', (register) => {
    //input fields
    cy.get('#mat-input-1').type(register.firstName);
    cy.get('#mat-input-2').type(register.lastName);
    cy.get('#mat-input-3').type(register.email);
    cy.get('#mat-input-4').type(register.companyName);

    //number
    cy.get('.mat-select-arrow').click();

    cy.get('#mat-option-0').click();
    cy.get('#mat-input-6').type(register.number);

    //password
    cy.get('#mat-input-5').type(register.password);
    cy.get('.ng-tns-c64-6 > .mat-focus-indicator').click();

    //checkbox
    cy.get('.mat-checkbox-inner-container').click();

});

