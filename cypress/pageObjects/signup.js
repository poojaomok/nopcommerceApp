//Revamp the date
let randomemail
let randomPassword
export class Signup {


    Registerheading = '.page-title'
    RegisterGenderFemale = '#gender-female'
    RegisterGenderMale = '#gender-male'
    RegisterFirstName = '#FirstName'
    RegisterLastName = '#LastName'
    RegisterDOBDay = '.date-picker-wrapper>select[name="DateOfBirthDay"]'
    RegisterDOBMonth = '.date-picker-wrapper[name="DateOfBirthMonth"]'
    RegisterDOBYear = '.date-picker-wrapper[name="DateOfBirthYear"]'
    RegisterEmail = '#Email'
    RegisterCompany = '#Company'
    RegisterNewsletter = '#Newsletter'
    RegisterPassword = '#Password'
    RegisterConfirmPassword = '#ConfirmPassword'
    RegisterSubmit = '#register-button'
    RegisterResult='.result'
    RegisterContinue='.buttons>a.button-1'
    RegisterEmailError='#Email-error'
    RegisterConfirmpasswordError='#ConfirmPassword-error'

    verifyRegisterheading()
    {
        cy.get(this.Registerheading).get('h1')
            .should('be.visible').and("have.text", 'Register')
    }
    enterGenderFemale() {
        cy.get(this.RegisterGenderFemale).check().should('be.checked')
    }
    enterGenderMale() {
        cy.get(this.RegisterGenderMale).check().should('be.checked')
    }
    enterFirstName() {
        const randomfname=Math.random().toString(36).substring(2,5)+"test"
        cy.get(this.RegisterFirstName).type(randomfname)
    }
    enterLastName() {
        const randomlname=Math.random().toString(36).substring(2,5)+"test"
        cy.get(this.RegisterLastName).type(randomlname)
    }

    enterDOB_Day() {

        cy.get('[name="DateOfBirthDay"]>option').then($datelist =>{
            //Math.floor(Math.random() * datelist.length)
            const rdate=Cypress._.random(0,$datelist.length-1)
            cy.get('[name="DateOfBirthDay"]>option').eq(rdate).then(($select)=>{
                const datetext=$select.text()
                cy.get('[name="DateOfBirthDay"]').select(datetext)
            })
        })
    }
    enterDOB_Month() {

        cy.get('[name="DateOfBirthMonth"]>option').then($datelist =>{
            //Math.floor(Math.random() * datelist.length)
            const rmonth=Cypress._.random(0,$datelist.length-1)
            cy.get('[name="DateOfBirthMonth"]>option').eq(rmonth).then(($select)=>{
                const monthtext=$select.text()
                cy.get('[name="DateOfBirthMonth"]').select(monthtext)
            })
        })
    }
    enterDOB_Year() {

        cy.get('[name="DateOfBirthYear"]>option').then($datelist =>{
            //Math.floor(Math.random() * datelist.length)
            const ryear=Cypress._.random(0,$datelist.length-1)
            cy.get('[name="DateOfBirthYear"]>option').eq(ryear).then(($select)=>{
                const monthyear=$select.text()
                cy.get('[name="DateOfBirthYear"]').select(monthyear)
            })
        })
    }
    enterEmail() {
         randomemail=Math.random().toString(36).substring(2,5)+"@gmail.com"
        cy.get(this.RegisterEmail).type(randomemail)
        return randomemail

    }
    enterCompanyName() {
        const randomcompname=Math.random().toString(36).substring(2,5)+"COM"
        cy.get(this.RegisterCompany).type(randomcompname)
    }
    checkNewsletter() {
        cy.get(this.RegisterNewsletter).check().should('be.checked')
    }
    enterPassword() {
         randomPassword=Math.random().toString(36).substring(2,5)+"123"
        cy.get(this.RegisterPassword).type(randomPassword)
        cy.get(this.RegisterConfirmPassword).type(randomPassword)
        return randomPassword

    }
    clickSubmit() {
        cy.get(this.RegisterSubmit).contains("Register").click()

    }
    verifyRegisterResult()
    {
        cy.url().should('contain', "https://demo.nopcommerce.com/registerresult/")
        cy.get(this.RegisterResult).should("have.text", 'Your registration completed')
    }
    clickContinue()
    {
        cy.get(this.RegisterContinue).should("have.text", 'Continue').click()
    }
    verifyErrorMessageEmail()
    {
        cy.get(this.RegisterEmailError).should('be.visible').and('have.text',"Email is required.")

    }
    enterUnmatchedPassword()
    {
        const randomPassword=Math.random().toString(36).substring(2,5)+"123"
        cy.get(this.RegisterPassword).type(randomPassword)
        cy.get(this.RegisterConfirmPassword).type(randomPassword+"abc")

    }
    verifyErrorMessagePassword()
    {

        cy.get(this.RegisterConfirmpasswordError).should('be.visible').and('have.text',"The password and confirmation password do not match.")
    }



}