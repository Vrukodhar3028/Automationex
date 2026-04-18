import baseurls from '../../config/config.json'
import Login from '../objects/autoexlogin.obj'
import autologin from '../fixtures/autologin.json'
import testcases from '../objects/testcasesauto.obj'
import autoex1 from '../objects/autoex.obj'


describe('Login test', () => {
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
    it.only('Product', () => {
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
            cy.get('p', testcases.availabilitytext).parent().should('contain', testcases.availability)
            cy.get('p', testcases.conditiontext).parent().should('contain', testcases.condition)
            cy.get('p', testcases.Brandname).parent().should('contain', testcases.Brand)

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
    it('Subscrieb Email', () => {
        cy.visit(baseurls.baseURLs1)
        cy.get('Footer').scrollIntoView()
        cy.get(testcases.subscribe).should('be.visible').type(autologin.Email)
        cy.get(testcases.dropdown).click()
        cy.contains('You have been successfully subscribed!')
    })
    it('Subscrieb Email from Cart page', () => {
        cy.visit(baseurls.baseURLs1)
        cy.get(testcases.cart).eq(0).should('exist').click()
        cy.url().should('include', 'view_cart')
        cy.get('Footer').scrollIntoView()
        cy.get(testcases.subscribe).should('be.visible').type(autologin.Email)
        cy.get(testcases.dropdown).click()
        cy.contains('You have been successfully subscribed!')
    })
    it('adding 2 Products to cart', () => {
        cy.visit(baseurls.baseURLs1)
        cy.get(testcases.products).should('be.visible').click()
        cy.url().should('include', 'products')
        cy.get(testcases.allproducts).should('be.visible')
        cy.get(testcases.firstprod).eq(1).first().trigger('mouseover')
        cy.get(testcases.addcart1).eq(0).click()
        cy.get(testcases.cart).should('exist')
        cy.get(testcases.cotinueshop).click()
        cy.get(testcases.firstprod).eq(2).should('be.visible')
        cy.get(testcases.firstprod).eq(2).trigger('mouseover')
        cy.get(testcases.addcard2).eq(0).click()
        cy.get(testcases.cart).should('exist')
        cy.get(testcases.viewcard).eq(1).click()
        cy.url().should('include', 'view_cart')
        cy.get(testcases.cartpage).find(`${testcases.prod1}, ${testcases.prod2}`).should('exist')
        cy.get(testcases.prod1).within(() => {
            cy.get(testcases.cartpr1).parent().should('contain', testcases.cartprprice)
            cy.get(testcases.cartprq).parent().should('contain', testcases.cartprqu)
            cy.get(testcases.cartprt).parent().should('contain', testcases.cartprprice)
        })
        cy.get(testcases.prod2).within(() => {
            cy.get(testcases.cartpr1).parent().should('contain', testcases.cartprprice1)
            cy.get(testcases.cartprq).parent().should('contain', testcases.cartprqu)
            cy.get(testcases.cartprt).parent().should('contain', testcases.cartprprice1)
        })

    })

    it('Product quantity in cart', () => {
        cy.visit(baseurls.baseURLs1)
        cy.get(testcases.products).should('be.visible').click()
        cy.url().should('include', 'products')
        cy.get(testcases.allproducts).should('be.visible')
        cy.get(testcases.firstprod).eq(3).should('exist')
        cy.get(testcases.viewprod).click()
        cy.url().should('include', 'product_details/3')
        cy.get(testcases.num).then(($input) => {
            const current = Number($input.val())
            const target = 4;
            const steps = target - current;

            cy.wrap($input)
                .focus()
                .type('{uparrow}'.repeat(steps))
        })
        cy.get(testcases.addtocart).should('exist').click()
        cy.get(testcases.cartmodal).should('exist')
        cy.get(testcases.viewcard).eq(1).click()
        cy.url().should('include', 'view_cart')
        cy.get(testcases.prod3).should('exist')
        cy.get(testcases.cartprq).should('contain.text', '4')
    })

})