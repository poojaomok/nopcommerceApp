let userdata
let product1
before( ()=>{
    cy.fixture("example").then((data)=>{
        userdata=data;
    })
})
export class Cart {

    cart_pagetitle='.page-title'
    cart_terms_input='#termsofservice'
    cart_checkout_button='#checkout'

    //checkout page
    checkout_country='#BillingNewAddress_CountryId'
    checkout_city='#BillingNewAddress_City'
    checkout_address1='#BillingNewAddress_Address1'
    checkout_postcode='#BillingNewAddress_ZipPostalCode'
    checkout_phoneno='#BillingNewAddress_PhoneNumber'
    checkout_billingadd_continue_button='#billing-buttons-container > .new-address-next-step-button'
    checkout_billing_method='#shippingoption_1'
    checkout_billingaddress='#opc-billing'
    checkout_billingaddress_editbutton='button[id="edit-billing-address-button"]'
    checkout_shippingmethod_continue_button='#shipping-method-buttons-container > .shipping-method-next-step-button'
    checkout_payment_method='#paymentmethod_0'
    //checkout_payment_method_type=`.method-name>input[value=="${shippingmethod}"]`
    checkout_paymentmethod_continue_button='#payment-method-buttons-container > .payment-method-next-step-button'
    checkout_paymentinfo_continue_button='#payment-info-buttons-container > .payment-info-next-step-button'
    checkout_confirm_button='#confirm-order-buttons-container > .confirm-order-next-step-button'
    checkout_confirm_message='.section>.title >strong'

    verifyCartpagetitle()
    {
        cy.get(this.cart_pagetitle).contains('Shopping cart')
    }
    verifycheckout()
    {
        cy.get(this.cart_terms_input).click()
        cy.get(this.cart_checkout_button).click()
    }

    //checkout methods
    AddCountry(countryvalue) {
        cy.get(this.checkout_country).select(countryvalue)
        //cy.get(this.checkout_country).should('have.text',"Germany")

    }
    AddBillingAddress(city,address1,postalcode,phone) {
        cy.get(this.checkout_city).clear().type(city)
        cy.get(this.checkout_address1).clear().type(address1)
        cy.get(this.checkout_postcode).clear().type(postalcode)
        cy.get(this.checkout_phoneno).clear().type(phone)
        cy.get(this.checkout_billingadd_continue_button).click()

    }
    VerifyShippingsameaddrress()
    {
        cy.wait(1000)
        cy.get(this.checkout_billingaddress).then($sameaddress => {
            if ($sameaddress.find(this.checkout_billingaddress_editbutton).length > 0) {
                cy.get(this.checkout_billingaddress_editbutton).click({force: true});
            } else {
                return
            }
        })
    }
    AddBillingMethod()
    {
        cy.get(this.checkout_billing_method).click();
        cy.get(this.checkout_shippingmethod_continue_button).click({force:true})
    }
    AddPaymentMethod()
    {
        cy.get(this.checkout_payment_method).click();
        cy.get(this.checkout_paymentmethod_continue_button).click({force:true})
    }
    chooseBillingMethod(shippingmethod)
    {
        cy.get(`input[value="${shippingmethod}"]`).click();
        cy.get(this.checkout_shippingmethod_continue_button).click({force:true})
    }
    verifyPaymentInfo()
    {

        cy.get(this.checkout_paymentinfo_continue_button).click({force:true})
    }
    confirmOrder()
    {

        cy.get(this.checkout_confirm_button).click({force:true})
    }
    verifySuccessMessage()
    {
        cy.get(this.cart_pagetitle).contains('Thank you')
        cy.get(this.checkout_confirm_message).contains('Your order has been successfully processed!')
        cy.get('.ico-logout').click()
    }
    verifycartitems() {
        cy.get("table.cart>tbody>tr:nth-child(1)>td:nth-child(3)>a.product-name")
            .invoke(value)
            .then((product) => {
                product1 = product.text()
                //     expect(x).to.equal('Kabul');
            })
    }
    verifycarttable() {
        cy.get("table.cart>tbody>tr")
            .each(($row, index, $rows) => {
                cy.wrap($row).within(() => {
                    cy.get("td").each(($col, index, $cols) => {
                        cy.log($col.text())
                    })

                })

            })
    }

    verifycarttableshoes(shoename) {
        cy.get("table.cart>tbody>tr:nth-child(1)>td:nth-child(3)>a")
            .then((value) =>{
                const x=value.text()
                expect(x).to.equal(shoename);
            })
    }
    verifycarttableshoesqty(qty) {
        cy.get("table.cart>tbody>tr:nth-child(1)>td:nth-child(5)>input[value="+qty+"]")
            .should('be.visible');

    }
    verifycarttablebooks(bookname) {
        cy.get("table.cart>tbody>tr:nth-child(2)>td:nth-child(3)>a")
            .then((value) =>{
                const x=value.text()
                expect(x).to.equal(bookname);
            })
    }
    verifycarttablesbooksqty(qty) {
        cy.get("table.cart>tbody>tr:nth-child(2)>td:nth-child(5)>input[value="+qty+"]")
            .should('be.visible');

    }
    Removeproductfromcart()
    {
        cy.get("table.cart>tbody>tr:nth-child(1)>td:nth-child(7)>button.remove-btn").click({force:true})
    }
    verifyCartafterremoval(){

    }

}