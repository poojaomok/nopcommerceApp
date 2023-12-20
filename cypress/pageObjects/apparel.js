

export class Apparel {

    apparel_shoesitem='.item-grid>.item-box'
    apparel_shoesaddtocart_button='#add-to-cart-button-26'
    apparel_shoepicture='.picture-gallery'
    apparel_cartsucces_notification='.bar-notification success'



    // verifyApparelPage()
    // {
    //     cy.url().should('contain','https://demo.nopcommerce.com/apparel')
    //     cy.get(this.apparel_pagetitle).text().should('have.text','Apparel')
    // }
    chooseShoesItem()
    {

        cy.get(this.apparel_shoesitem).eq(2).find('.product-box-add-to-cart-button').click()
        // cy.get(this.apparel_shoepicture).should('be.visible')
        // cy.url().should('contain', "https://demo.nopcommerce.com/")
    }
    addShoestoCart()
    {
        // cy.get('.item-grid>.item-box').then(shoeslist =>{
        //     //cy.log(shoeslist.length)
        //     const randomlist=Cypress._.random(0,shoeslist.length-1)
        //     cy.get('.item-grid>.item-box').children().eq(randomlist).click()


        cy.get(this.apparel_shoesaddtocart_button).click({force:true})
        //cy.pause()
        // cy.get(this.apparel_cartsucces_notification).should('be.visible')
        //     .and('contains','The product has been added to your shopping cart ')

        //     })
        // })
        //})
    }
    // chooseshoessize()
    // {
    //     // const randomsize=Cypress._.random(0,shoeslist.length-1)
    //     // cy.get('.item-grid>.item-box').children().eq(randomlist).click()
    //     cy.get(this.apparel_shoesssize).children().then( sizelist =>{
    //         const randomsize=Cypress._.random(0,sizelist.length-1)
    //         cy.log(randomsize.length)
    //
    //
    //     })
    // }



}