/// <reference types="cypress" />

describe('login page', () => {

    beforeEach(() => {
        //url
        cy.clearCookies();
        cy.visit("https://app.notifyre.com/login");
        cy.wait(3000);
        cy.reload()
    }) 

    it('forgot password', () => {
        
        cy.get('.ng-untouched .text-caption').click();
  
        cy.url().should('include', "forgot-password");
  
      });

    it('unsuccessful', () => {
        
        cy.get('#mat-input-0').type("marben.dimson@gologic.com.au");
        cy.get('.mat-button-base.mat-flat-button.mat-primary.ng-star-inserted').click();
        cy.get('#mat-input-1').type("Temp1234");
        cy.get('.mat-button-base.mat-flat-button.mat-primary.ng-star-inserted').click();

        cy.get('.error-message-box').should('have.text', "The email address or password you entered is incorrect");

    
    });

    it('successful', () => {
        
        cy.get('#mat-input-0').type("marben.dimson@gologic.com.au");
        cy.get('.mat-button-base.mat-flat-button.mat-primary.ng-star-inserted').click();
        cy.get('#mat-input-1').type("Temp1234!!");
        cy.get('.mat-button-base.mat-flat-button.mat-primary.ng-star-inserted').click();

        cy.clearCookies();
        cy.wait(5000);
    
        cy.get('.text-title > b').should('have.text' ,"Welcome to Notifyre");

    });


});