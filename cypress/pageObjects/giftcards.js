

export class Giftcards {


    giftcards_url='https://demo.nopcommerce.com/gift-cards'
    giftcards_item1=':nth-child(1) > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button'


    verifypagegiftcards()
    {

        cy.url().should('contain',this.giftcards_url)

    }
    addgiftcardtoCart()
    {

        cy.get(this.giftcards_item1).click({force:true})

    }



}