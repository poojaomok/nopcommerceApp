

export class Apparel {

    apparel_shoesitem='.item-grid>.item-box'
    apparel_shoesaddtocart_button='#add-to-cart-button-26'
    shoes_item=':nth-child(3) > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button'
    shoes_name=':nth-child(3) > .product-item > .details > .product-title>a'
    apparel_url='https://demo.nopcommerce.com/apparel'


    verifypageapparel()
    {

        cy.url().should('contain',this.apparel_url)

    }
    chooseShoesItem()
    {

        cy.get(this.apparel_shoesitem).eq(2).find('.product-box-add-to-cart-button').click({delay: 1000})
        // cy.get(this.apparel_shoepicture).should('be.visible')
        // cy.url().should('contain', "https://demo.nopcommerce.com/")
    }

    getShoesName()
    {
        cy.get(this.shoes_name).then((text1) => {
            //cy.wrap(text).as('shoesname');

            const shoesname=text1.text()
            return shoesname



        });

    }



}