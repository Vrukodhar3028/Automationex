/// <reference types="cypress" />
import baseurls from '../../config/config.json'
import { generateUser } from '../support/userfactory'
import checkout from '../objects/checkout.obj'
import testcases from '../objects/testcasesauto.obj'
import autoex1 from '../objects/autoex.obj'
import login from '../objects/autoexlogin.obj'

describe('Registration while checkout', () => {
    it('Register during checkout', () => {
        cy.visit(baseurls.baseURLs1)
        cy.get(testcases.products).should('be.visible').click()
        cy.url().should('include', 'products')
        cy.get(testcases.allproducts).should('be.visible')
        cy.get(testcases.firstprod).eq(1).first().trigger('mouseover')
        cy.get(testcases.addcart1).eq(0).click()
        cy.get(testcases.cartpage).should('exist')
        cy.get(testcases.viewcard).eq(1).click()
        cy.url().should('include', 'view_cart')
        cy.get(checkout.proceedcheck).should('exist').click()
        cy.get(checkout.checkoutmodal).should('be.visible').within(() => {
            cy.get(checkout.checklogin).click()
        })
        const user = generateUser()
        cy.wrap(user).as('userdata')

        cy.url().should('include', 'login')

        cy.get(autoex1.row).eq(1)
            .find(`${autoex1.logf},${autoex1.signf}`)
            .should('have.length', 2)
            .and('be.visible')

        cy.get(autoex1.signf)
            .find(`${autoex1.signu},${autoex1.email}, ${autoex1.button}`)
            .should('be.visible')

        cy.get(autoex1.signu).type(user.signup)
        cy.get(autoex1.email).type(user.email)
        cy.get(autoex1.button).click()
        cy.url().should('include', 'signup')

        cy.get(autoex1.signfr)
            .should('contain.text', autoex1.text)
            .and('be.visible')

        cy.get(autoex1.check)
            .find(`${autoex1.gender1}, ${autoex1.gender2}`)
            .should('be.visible')
        cy.get(autoex1.gender1).click()

        cy.get(autoex1.name)
            .should('be.visible')
            .and('have.value', user.signup)
            .clear()
            .type(user.signup)

        cy.get(autoex1.email2)
            .should('be.visible')
            .and('have.value', user.email)

        cy.get(autoex1.passw)
            .should('be.visible')
            .type(user.passw)

        cy.get(autoex1.DOB).eq(0).find(`${autoex1.day}, ${autoex1.month}, ${autoex1.year}`).should('be.visible')
        //DOB selecting to the day/mpnth/year dropdown and checking it is in scrolling view and checking the no.of days and then selecting the day we wanted
        cy.get(autoex1.day).scrollIntoView()
            .find('option').should('have.length', 32)//find('option') to count the options within the DD.
        cy.get(autoex1.day).select('10').should('have.value', '10')
        cy.get(autoex1.month).scrollIntoView()
            .find('option').should('have.length', 12 + 1)
        cy.get(autoex1.month).select('June').should('have.value', '6')
        cy.get(autoex1.year).scrollIntoView()
            .find('option').should('have.length', 122 + 1)
        cy.get(autoex1.year).select('1990').should('have.value', '1990')
        cy.get(autoex1.news).eq(0).should('be.visible')

        cy.get(autoex1.news).eq(0).should('be.visible').click()
        cy.get(autoex1.adtext).should('exist')

        cy.get(autoex1.fir).should('exist').type(user.fir)
        cy.get(autoex1.las).should('exist').type(user.las)
        cy.get(autoex1.com).should('exist')

        cy.get(`${autoex1.ad}, ${autoex1.ad}`).should('exist')
        cy.get(autoex1.ad1).type(user.ad1)

        cy.get(autoex1.con).should('exist').and('have.value', 'India')
            .find('option')
            .should('have.length', 7)
        cy.get(autoex1.con).find('option').each(($option) => {
            const value = $option.val()
            cy.get(autoex1.con).select(value).should('have.value', value)
        })
        cy.get(autoex1.con).select('Canada').should('have.value', 'Canada')

        cy.get(autoex1.state).should('exist').type(user.state)
        cy.get(autoex1.city).should('exist').type(user.city)
        cy.get(autoex1.zip).should('exist').type(user.zip)
        cy.get(autoex1.Mobile).should('exist').type(user.Mobile)

        cy.get(autoex1.creacc).should('exist').click()
        cy.get(autoex1.ref).should('be.visible')
        cy.url().should('include', 'account_created')
        cy.get(autoex1.creacc).should('not.exist')
        cy.get(checkout.continueb).eq(1).should('exist').click()
        cy.get('@userdata').then((user) => {
            cy.contains(checkout.loggedtext).should('contain.text', user.signup)
        })
        cy.visit('https://www.automationexercise.com/view_cart')
        cy.get(checkout.proceedcheck).click()
        cy.get('@userdata').then((user) => {
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
        })
        cy.get(testcases.prod1).within(() => {
            cy.get(testcases.cartprdes).parent().should('contain', testcases.cartprdes1)
            cy.get(testcases.cartpr1).parent().should('contain', testcases.cartprprice)
            cy.get(testcases.cartprq).parent().should('contain', testcases.cartprqu)
            cy.get(testcases.cartprt).parent().should('contain', testcases.cartprprice)
        })
        cy.get(checkout.message).should('exist').type(user.comment)
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

    })
})