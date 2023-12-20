import {Home} from "../pageObjects/home";
import {Signup} from "../pageObjects/signup";
import {Login} from "../pageObjects/login";
import {Apparel} from "../pageObjects/apparel";
import {Cart} from "../pageObjects/cart";
import {Books} from "../pageObjects/books";
import {Giftcards} from "../pageObjects/giftcards";

describe('User Signup and Checkout', () => {

  const home = new Home()
  const signup = new Signup()
  const login = new Login()
  const apparel = new Apparel()
  const books = new Books()
  const giftcards = new Giftcards()
  const cart = new Cart()
  let email
  let pass
  let userdata
  let product
  let shoesname

  before( ()=> {
    cy.fixture("example").then((data) => {
      userdata = data;
    })
  })
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
    cy.intercept({
      url: 'https://demo.nopcommerce.com/apparel',
      method: 'GET'
    }).as('apparel');
    cy.intercept({
      url: 'https://demo.nopcommerce.com/shoes',
      method: 'GET'
    }).as('shoes')
    cy.intercept({
      url: /addproducttocart\/catalog\/\d+/,
      method: 'POST'
    }).as('addcart')
    cy.intercept({
      url: /demo.nopcommerce.com\/\d+/,
      method: 'GET'
    }).as('item')
    cy.intercept({
      url:'/checkout/OpcSaveBilling/',
      //checkout/OpcSaveShippingMethod/
      method: 'POST'
    }).as('SaveBillingAdd')
    cy.intercept({
      url:'/checkout/OpcSaveShippingMethod/',
      //checkout/OpcSavePaymentMethod/
      method: 'POST'
    }).as('SaveShippingMethod')
    cy.intercept({
      url:'/checkout/OpcSavePaymentMethod/',
      //checkout/OpcSavePaymentInfo/
      method: 'POST'
    }).as('SavePaymentMethod')
    cy.intercept({
      url:'/checkout/OpcSavePaymentInfo/',
      //checkout/OpcConfirmOrder/
      method: 'POST'
    }).as('SavePaymentInfo')
    cy.intercept({
      url:'/checkout/OpcConfirmOrder/',
      //checkout/OpcConfirmOrder/
      method: 'POST'
    }).as('ConfirmOrder')
  })

  it('User signup and checkout', () => {
    home.verifyAppLogo()
    home.clickRegisterLink()
    signup.verifyRegisterheading()
    signup.enterGenderFemale()
    signup.enterFirstName()
    signup.enterLastName()
    signup.enterDOB_Day()
    signup.enterDOB_Month()
    signup.enterDOB_Year()
    email=signup.enterEmail()
    signup.enterCompanyName()
    signup.checkNewsletter()
    pass=signup.enterPassword()
    signup.clickSubmit()
    cy.wait('@register').its('response.statusCode').should('eq', 200);
    signup.verifyRegisterResult()
    signup.clickContinue()
    cy.wait('@home').its('response.statusCode').should('eq', 200);
    login.verifyLoginPage()
    login.verifyLoginNewUser(email,pass)
    login.verifyLoginSuccess()
    home.chooseCategoryApparel()
    cy.wait('@apparel').its('response.statusCode').should('eq', 200);
    home.chooseSubCategoryShoes()
    cy.wait('@shoes').its('response.statusCode').should('eq', 200);
    apparel.chooseShoesItem()
    cy.wait('@addcart').its('response.statusCode').should('eq', 200);
    home.gotoShoppincart()
    cart.verifyCartpagetitle()
    cart.verifycheckout()
    cart.AddCountry(userdata.new_user.country_value)
     cart.AddBillingAddress(userdata.new_user.city,userdata.new_user.address1,userdata.new_user.postcode,userdata.new_user.phone)
     cy.wait('@SaveBillingAdd').its('response.statusCode').should('eq', 200);
    cart.chooseBillingMethod((userdata.new_user.shipping_method))
    cy.wait('@SaveShippingMethod').its('response.statusCode').should('eq', 200);
    cart.AddPaymentMethod()
    cy.wait('@SavePaymentMethod').its('response.statusCode').should('eq', 200);
    cart.verifyPaymentInfo()
    cy.wait('@SavePaymentInfo').its('response.statusCode').should('eq', 200);
    cart.confirmOrder()
    cy.wait('@ConfirmOrder').its('response.statusCode').should('eq', 200);
    cart.verifySuccessMessage();
  });

  it('Invalid SignupAttempt1', () => {
    //unmatched password
    home.verifyAppLogo()
    home.clickRegisterLink()
    signup.verifyRegisterheading()
    signup.enterGenderFemale()
    signup.enterFirstName()
    signup.enterLastName()
    signup.enterDOB_Day()
    signup.enterDOB_Month()
    signup.enterDOB_Year()
    signup.enterCompanyName()
    signup.checkNewsletter()
    signup.enterUnmatchedPassword()
    signup.clickSubmit()
    signup.verifyErrorMessagePassword(userdata.error_message.wrong_password_message)
  });
  it('Invalid Singnup Attempt2', () => {
    //empty a mandatory field
    home.verifyAppLogo()
    home.clickRegisterLink()
    signup.enterGenderMale()
    signup.enterFirstName()
    signup.enterLastName()
    signup.enterDOB_Day()
    signup.enterDOB_Month()
    signup.enterDOB_Year()
    signup.enterCompanyName()
    signup.checkNewsletter()
    signup.enterPassword()
    signup.clickSubmit()
    signup.verifyErrorMessageEmail(userdata.error_message.no_email_message)
  })
  it('Existing User login and checkout', () => {
    login.verifyLoginPage()
    login.verifyLoginNewUser(userdata.valid_user.user_email,userdata.valid_user.password)
    login.verifyLoginSuccess()
    home.chooseCategoryApparel()
    cy.wait('@apparel').its('response.statusCode').should('eq', 200);
    home.chooseSubCategoryShoes()
    cy.wait('@shoes').its('response.statusCode').should('eq', 200);
    apparel.chooseShoesItem()
    cy.wait('@addcart').its('response.statusCode').should('eq', 200);
    home.gotoShoppincart()
    cart.verifyCartpagetitle()
    cart.verifycheckout()
    cart.VerifyShippingsameaddrress()
    cart.AddCountry(userdata.valid_user.country_value)
    cart.AddBillingAddress(userdata.valid_user.city,userdata.new_user.address1,userdata.new_user.postcode,userdata.new_user.phone)
    cy.wait('@SaveBillingAdd').its('response.statusCode').should('eq', 200);
    cart.chooseBillingMethod((userdata.valid_user.shipping_method))
    cy.wait('@SaveShippingMethod').its('response.statusCode').should('eq', 200);
    cart.AddPaymentMethod()
    cy.wait('@SavePaymentMethod').its('response.statusCode').should('eq', 200);
    cart.verifyPaymentInfo()
    cy.wait('@SavePaymentInfo').its('response.statusCode').should('eq', 200);
    cart.confirmOrder()
    cy.wait('@ConfirmOrder').its('response.statusCode').should('eq', 200);
    cart.verifySuccessMessage();
  })
  it.only('Verify Cart Functionality', () => {
    login.verifyLoginPage()
    login.verifyLoginNewUser(userdata.valid_user.user_email,userdata.valid_user.password)
    login.verifyLoginSuccess()
    home.chooseCategoryApparel()
    //wait for api success - to check page apparel
    cy.wait('@apparel').its('response.statusCode').should('eq', 200);
    home.chooseSubCategoryShoes()
    cy.wait('@shoes').its('response.statusCode').should('eq', 200);
    shoesname=apparel.getShoesName()
    cy.log(shoesname)
    apparel.chooseShoesItem()
    cy.wait('@addcart').its('response.statusCode').should('eq', 200);
    home.chooseCategoryBooks()
    //validate  url -- to check page BOOKS
    books.verifypagebooks()
    books.getBooksName()
    books.addbookstoCart()
    cy.wait('@addcart').its('response.statusCode').should('eq', 200);
    home.gotoShoppincart()
    cart.verifyCartpagetitle()
    cart.verifycarttableshoes(userdata.valid_user.products_purchased.shoesname1)
    cart.verifycarttablebooks(userdata.valid_user.products_purchased.booksname)
    cart.verifycarttableshoesqty(userdata.valid_user.products_purchased.shoesqty)
    cart.verifycarttablesbooksqty(userdata.valid_user.products_purchased.booksqty)
    cy.wait(3000)
    cart.Removeproductfromcart()
    cy.wait(3000)




  })



})