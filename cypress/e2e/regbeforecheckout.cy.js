/// <reference types="cypress" />
import baseurls from '../../config/config.json'
import testcases from '../objects/testcasesauto.obj'
import autoex1 from '../objects/autoex.obj'
import checkout from '../objects/checkout.obj'
import login from '../objects/autoexlogin.obj'

describe("Registration before checkout", () => {

    const checkoutflow = () => {
        cy.get('@userdata').then((user) => {
            cy.contains(checkout.loggedtext).should('contain.text', user.signup)

            cy.get(testcases.products).should('be.visible').click()
            cy.url().should('include', 'products')
            cy.get(testcases.allproducts).should('be.visible')
            cy.get(testcases.firstprod).eq(1).first().trigger('mouseover')
            cy.get(testcases.addcart1).eq(0).click()
            cy.get(testcases.cartpage).should('exist')
            cy.get(testcases.viewcard).eq(1).click()
            cy.url().should('include', 'view_cart')
            cy.get(checkout.proceedcheck).should('exist').click()

            cy.get(checkout.addval).eq(0).within(() => {
                cy.contains(`${user.fir} ${user.las}`).should('be.visible')
                cy.contains(user.ad1).should('be.visible')
                cy.contains(`${user.city} ${user.state} ${user.zip}`).should('be.visible')
                cy.contains(user.con).should('be.visible')
                cy.contains(user.Mobile).should('be.visible')
            })
            cy.get(checkout.addval).eq(1).within(() => {
                cy.contains(`${user.fir} ${user.las}`).should('be.visible')
                cy.contains(user.ad1).should('be.visible')
                cy.contains(`${user.city} ${user.state} ${user.zip}`).should('be.visible')
                cy.contains(user.con).should('be.visible')
                cy.contains(user.Mobile).should('be.visible')
            })

            cy.get(testcases.prod1).within(() => {
                cy.get(testcases.cartprdes).parent().should('contain', testcases.cartprdes1)
                cy.get(testcases.cartpr1).parent().should('contain', testcases.cartprprice)
                cy.get(testcases.cartprq).parent().should('contain', testcases.cartprqu)
                cy.get(testcases.cartprt).parent().should('contain', testcases.cartprprice)
            })
            cy.get(checkout.message).should('exist').type(user.comment)

            const paymentflow = () => {
                cy.get(checkout.placeor).should('exist').click()
                cy.url().should('include', 'payment')
                cy.get(checkout.Paypage).should('be.visible')
                cy.get(checkout.cardname).should('exist').type(user.Cardname)
                cy.get(checkout.cardnum).should('exist').type(user.Cardnum)
                cy.get(checkout.cvc).should('exist').type(user.CVC)
                cy.get(checkout.expiry).eq(0).should('exist').type(user.expirymonth)
                cy.get(checkout.expiry).eq(1).should('exist').type(user.expiryyear)
                cy.get(checkout.confirmorder).should('exist').click()
                cy.get(checkout.orderplaced).should('exist')
                cy.get(checkout.deleteacc).should('exist').click()
                cy.get(checkout.accdeleted).should('exist')
                cy.get(checkout.cont).click()
                cy.get(login.Logoutbutton).should('not.exist')
            }

        })
    }


    it("registration before checkout", () => {
        cy.visit(baseurls.baseURLs1)
        cy.get(checkout.homepage).should('exist')
        cy.registerUser()
        cy.url().should('include', 'account_created')
        cy.get(autoex1.creacc).should('not.exist')
        cy.get(checkout.continueb).eq(1).should('exist').click()
        checkoutflow()

    })


    it.skip("Login before checkout", () => {
        cy.visit(baseurls.baseURLs1)
        cy.get(checkout.homepage).should('exist')
        cy.Login()
        paymentflow()

    })
})

