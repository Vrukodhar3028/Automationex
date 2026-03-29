import baseurls from '../../config/config.json'
import Login from '../objects/autoexlogin.obj'
import autologin from '../fixtures/autologin.json'
import testcases from '../objects/testcasesauto.obj'
import autoex1 from '../objects/autoex.obj'


describe('Registration test', () => {
    function login() {
        cy.visit(baseurls.baseURLs1)
        cy.get(autoex1.clogin).click()
        cy.url().should('include', 'login')
        cy.get(autoex1.logf).should('be.visible')
        cy.get(`${Login.Email}, ${Login.Passwor}`).should('be.visible')
        cy.get(Login.Email).type(autologin.Email)
        cy.get(Login.Passwor).type(autologin.Password)
        cy.get(Login.Loginbutton).should('be.enabled').click()
        cy.get(Login.Logoutbutton).should('be.visible')
    }

    it('Test cases page', () => {
        login()
        cy.get(testcases.testcase).eq(0).should('exist').click({ force: true })
        cy.url().should('include', 'test_cases')
        cy.contains(testcases.text).should('be.visible')

    })
    it('Product', () => {
        login()
        cy.get(testcases.products).should('be.visible').click()
        cy.url().should('include', 'products')
        cy.get(testcases.allproducts).should('be.visible')
        cy.get(testcases.firstproduct).should('be.visible').click()
        cy.url().should('include', 'product_details/1')
        cy.get(testcases.productinfo).within(() => {
            cy.get('h2').should('contain', testcases.h2)
            cy.get('p').should('contain', testcases.p1)
            cy.get('span span').should('contain', testcases.span)
            cy.get(testcases.quantity).should('have.value', testcases.quantityptag)
            cy.get(testcases.cart).eq(0).should('be.visible').and('not.be.disabled')
            cy.contains('p', 'Availability:').parent().should('contain', testcases.availability)
            cy.contains('p', 'Condition:').parent().should('contain', testcases.condition)
            cy.contains('p', 'Brand:').parent().should('contain', testcases.Brand)

        })
    })
    it('Search Product', () => {
        login()
        cy.get(testcases.products).should('be.visible').click()
        cy.url().should('include', 'products')
        cy.get(testcases.allproducts).should('be.visible')
        cy.get(testcases.search).should('be.visible').type(autologin.Searchfield)
        cy.get(testcases.submitsearch).click()
        cy.get(testcases.searchedprod).should('contain', testcases.searchtext)

    })
})