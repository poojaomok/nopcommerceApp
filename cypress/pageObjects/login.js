import {Signup} from "./signup";

let userdata
const signup = new Signup()
before( ()=>{
    cy.fixture("example").then((data)=>{
        userdata=data;
    })
//     cy.fixture("example").then((data)=>{
//         data.foreach(userdata)=>{

//     })
})
export class Login {
    login_link='.ico-login'
    loginemail_input='#Email'
    loginpassword_input='#Password'
    login_button='.login-button'
    login_pageheading='.topic-block-title > h2'
    login_logoutbutton='.ico-logout'



    verifyLoginPage()
    {
        cy.get(this.login_link).click();
        cy.url().should('contain',Cypress.env('BASE_URL')+'login')

    }

    verifyLoginUser(username,password)
    {
        cy.loginAsValidUser(username,password)
    }
    verifyLoginSuccess()
    {
        cy.get(this.login_pageheading).should('have.text','Welcome to our store');
        cy.get(this.login_logoutbutton).should('be.visible')

    }






}