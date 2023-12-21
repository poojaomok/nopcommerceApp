
let bookname1
export class Books {

    books_url=Cypress.env('BASE_URL')+'books'
    books_item1=':nth-child(1) > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button'


    verifypagebooks()
    {

        cy.url().should('contain',this.books_url)

    }
    addbookstoCart()
    {
        cy.get(this.books_item1).scrollIntoView().click({force:true},{timeout: 2000})


    }



}