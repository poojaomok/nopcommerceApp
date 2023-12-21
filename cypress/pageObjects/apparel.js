

export class Apparel {

    apparel_shoesitem='.item-grid>.item-box'
    apparel_url=Cypress.env('BASE_URL')+'apparel'


    verifypageapparel()
    {

        cy.url().should('contain',this.apparel_url)

    }
    chooseShoesItem()
    {
        cy.get(this.apparel_shoesitem).should('be.visible')
        cy.get(this.apparel_shoesitem).eq(2).find('.product-box-add-to-cart-button').scrollIntoView().click({delay: 1000})

    }

}