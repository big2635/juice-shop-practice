class juiceShop_forgot_password{

    forgotPasssword(email,answer,newPassword,repeatNewPassword,$selector,textToLocate){
    
        cy.get('#email').type(email);
        cy.get('#securityAnswer').type(answer);
        cy.get('#newPassword').type(newPassword);
        cy.get('#newPasswordRepeat').type(repeatNewPassword);
        cy.get('#resetButton').click();
        cy.get($selector).contains(textToLocate)
    
    }
    

}
export default juiceShop_forgot_password;