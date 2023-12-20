export class Home {
    RegisterLink = '.ico-register' //move  to another po
    Applogo = '.header-logo'// move to another po
    Home_apparellink='.notmobile > :nth-child(3) > [href="/apparel"]'
    Home_apparel_shoeslink='.active > .sublist > :nth-child(1) > a[href="/shoes"]'
    Home_shoppingcartlink='.cart-label'

    verifyAppLogo()
    {
        cy.get(this.Applogo).should('be.visible');

    }
    clickRegisterLink()
    {
        cy.get(this.RegisterLink).contains("Register").click()
        cy.url().should('contain',"https://demo.nopcommerce.com/register")

    }
    chooseCategoryApparel()
    {
        cy.get(this.Home_apparellink).click({force: true})
    }
    chooseSubCategoryShoes()
    {
        cy.get(this.Home_apparel_shoeslink).click({force: true})
    }
    gotoShoppincart()
    {
        cy.get(this.Home_shoppingcartlink).scrollIntoView().click({force: true})
    }

}