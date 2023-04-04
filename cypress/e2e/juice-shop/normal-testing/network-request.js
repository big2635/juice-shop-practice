/// <reference types="cypress" />

describe('Network Request', () => {

    //let message = "Unable to find comment!"

    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests"); //url visiting
    })


    //Get the json in xhr
    it('Get Req', () => {
        cy.intercept({ //to enter the url
            method: "GET",
            url: "**/comments/*",
        }, {
            body: //json data
            {
                postId: 1,
                id: 1,
                name: "test 123",
                email: "joe@gmail.com",
                body: "Hello World"
            }
        }).as("getComment"); //alias
        cy.get(".btn-primary").click();

        cy.wait('@getComment').its("response.statusCode").should("eq", 200); //status
    });

    //Post or add on json in xhr
    it('Post Req', () => {
        cy.intercept("POST", "/comments").as("postComment"); //to enter the url

        cy.get('.network-post').click();

        //getting request and getting response
        cy.wait('@postComment').should(({
            request,
            response
        }) => {
            console.log(request);

            expect(request.body).to.include("email"); //to check the body if have email

            console.log(response);
            expect(response.body).to.have.property("name", "Using POST in cy.intercept()"); //assertion

            expect(request.headers).to.have.property("content-type"); // to check header
            expect(request.headers).to.have.property("origin", "https://example.cypress.io"); // to check header
        })
    });

    //put or update json in xhr
    it('PUT Req', () => {
        cy.intercept({ //to enter in url
            method: "PUT",
            url: "**/comments/*"
        },
        { //make own response
            statusCode: 404,
            body: {error: message},
            delay: 500
        }).as("putComment"); //alias

        cy.get('.btn-warning').click();

        cy.wait("@putComment");

        cy.get('.network-put-comment').should("contain", message) //check the text
    });
});