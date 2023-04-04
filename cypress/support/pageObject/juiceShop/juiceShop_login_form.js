class juiceShop_login_form{

    loginForm(email,password){
        
        cy.get('#email').type(email);
        cy.get('#password').type(password);
    }

}
export default juiceShop_login_form;