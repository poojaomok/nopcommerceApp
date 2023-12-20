
let bookname1
export class Books {


    books_url='https://demo.nopcommerce.com/books'
    books_item1=':nth-child(1) > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button'
    books_item2=':nth-child(2) > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button'
    books_name1=':nth-child(1) > .product-item > .details > .product-title>a'
    books_name2=':nth-child(2) > .product-item > .details > .product-title>a'

    verifypagebooks()
    {

        cy.url().should('contain',this.books_url)

    }
    addbookstoCart()
    {
        cy.get(this.books_item1).click({force:true},{delay: 1000})


    }
    getBooksName()
    {
        cy.get(this.books_name1).invoke('text').then((text1) => {
            cy.wrap(text1).as('bookname1');
        });

    }



}