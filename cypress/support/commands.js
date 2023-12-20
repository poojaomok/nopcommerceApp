Cypress.Commands.add('loginAsValidExsitingUser',(username,password)=>{

    cy.get('#Email').type(username);
    cy.get('#Password').type(password);
    cy.get('.login-button').click();
})

Cypress.Commands.add('loginAsValidUser',(username,password)=>{

    cy.get('#Email').type(username);
    cy.get('#Password').type(password);
    cy.get('.login-button').click();
})