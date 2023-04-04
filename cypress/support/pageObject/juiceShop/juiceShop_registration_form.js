class juiceShop_registratiion_form{

    registrationForm(email,password,repass,securityAnswer){
        //text input
        cy.get('#emailControl').type(email);
        cy.get('#passwordControl').type(password);
        cy.get('#repeatPasswordControl').type(repass);
    
        //drop down list
        cy.get('.mat-select-arrow').click();
        cy.get('mat-option:nth-of-type(2)').click();
        cy.get('#securityAnswerControl').type(securityAnswer);
    }

}
export default juiceShop_registratiion_form;