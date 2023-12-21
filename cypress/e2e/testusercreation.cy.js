// this test can be executed if the test account creds doesnt work (the app clears the account data every 1 hour(
// the test executes and create a user which is a valid user used in different scenarios

import {Home} from "../pageObjects/home";
import {Signup} from "../pageObjects/signup";

describe('Gererate test account', () => {
    const home = new Home()
    const signup = new Signup()

    beforeEach(()=>{

        cy.visit(Cypress.env('BASE_URL'))
        cy.intercept({
            url: 'https://demo.nopcommerce.com/registerresult/1?returnUrl=/',
            method: 'GET'
        }).as('register');
        cy.intercept({
            url: 'https://demo.nopcommerce.com',
            method: 'GET'
        }).as('home');
    })


    it.skip('Create new user for test', () => {
        home.verifyAppLogo()
        home.clickRegisterLink()
        signup.verifyRegisterheading()
        signup.enterGenderFemale()
        signup.enterFirstName()
        signup.enterLastName()
        signup.enterDOB_Day()
        signup.enterDOB_Month()
        signup.enterDOB_Year()
        signup.enterTestEmail((Cypress.env('TEST_EMAIL')))
        signup.enterCompanyName()
        signup.checkNewsletter()
        signup.enterTestPassword(Cypress.env('TEST_PASSWORD'))
        signup.clickSubmit()
        cy.wait('@register').its('response.statusCode').should('eq', 200);
        signup.verifyRegisterResult()
        signup.clickContinue()
        cy.wait('@home').its('response.statusCode').should('eq', 200);

    })
})