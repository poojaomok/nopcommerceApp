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
        cy.wait(1000)
    }

    //checkout methods
    AddCountry(countryvalue) {
        cy.get(this.checkout_country).select(countryvalue)

    }
    AddBillingAddress(city,address1,postalcode,phone) {
        //cy.get(this.checkout_city).should('be.visible')
        cy.get(this.checkout_city).as('btn')
            cy.get('@btn').clear().type(city)
        cy.get(this.checkout_address1).clear().type(address1)
        cy.get(this.checkout_postcode).clear().type(postalcode)
        cy.get(this.checkout_phoneno).clear().type(phone)
        cy.get(this.checkout_billingadd_continue_button).click()

    }
    VerifyShippingsameaddrress()
    {
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
        cy.get(this.cart_pagetitle).contains('Thank you',{timeout: 2000})
        cy.get(this.checkout_confirm_message).contains('Your order has been successfully processed!')
        cy.get('.ico-logout').click()
    }

    //verifycarttableitem() {
    //     const itemsMap = new Map();
    //     for(let i = 0; i < userdata.valid_user.items_purchased.length; i++) {
    //         itemsMap.set(userdata.valid_user.items_purchased[i].code, userdata.valid_user.items_purchased[i].qty);
    //     }
    //     cy.get("table.cart>tbody>tr")
    //         // check for multiple row@@@
    //         .each(($row, index, $rows) => {
    //             cy.wrap($row).within(() => {
    //                 const prodCode = cy.get("td:nth-child(1)").get(0).text();
    //                 const prodQty = cy.get("td:nth-child(5)").get(0).text();
    //                 cy.log(prodCode)
    //                 cy.log(prodQty)
    //                 cy.get("td:nth-child(1)").each(($col, index, $cols) => {
    //                     cy.log($col.text())
    //                     expect($col.text()).to.be.oneOf([userdata.valid_user.items_purchased[0].code,userdata.valid_user.items_purchased[1].code])
    //                 })
    //
    //             })
    //
    //         })
    // }
    verifycarttableitem() {
        for(let i = 0; i < userdata.valid_user.items_purchased.length; i++) {
            cy.contains('td', userdata.valid_user.items_purchased[i].code)
                .get('td.quantity>input').invoke('val').then((val)=> {
                expect(Number(val)).to.equal(userdata.valid_user.items_purchased[i].qty);
                })
        }
    }



    removeProductfromCart1()
    {
        cy.contains('td', userdata.valid_user.items_purchased[0].code)
            .siblings()
            .get('td.remove-from-cart>button.remove-btn').as('btn')
            cy.get('@btn').should('be.visible')
            cy.get('@btn').eq(0).should('be.visible').click({delay:2000})

    }
    verifyRemovedIteminCart()
    {
        cy.contains('td', userdata.valid_user.items_purchased[0].code).should('not.exist')
    }

    updateQtyinCart()
    {
        cy.contains('td', userdata.valid_user.items_purchased[1].code)
            .get('td.quantity>input').clear().type(2)
    }
    verifyUpdatedQtyinCart()
    {
        cy.contains('td', userdata.valid_user.items_purchased[1].code)
            .get('td.quantity>input').invoke('val').then((val)=> {
            expect(val).to.equal('2');
        })
    }

    removeAllitemsfromCart()
    {
        cy.get('td.remove-from-cart>button.remove-btn')
            .click({multiple:true})

    }

}