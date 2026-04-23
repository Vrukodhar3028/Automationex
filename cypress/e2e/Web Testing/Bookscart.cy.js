///<reference types = "cypress"/>
import locators from '../../objects/autoex.obj'
import userr from '../../fixtures/usercreds.json'
import baseURLs from "../../../config/config.json"

describe("Books cart page", () => {
    it.only('Registration test', () => {
        cy.visit(baseURLs.baseURLs3)
        //cy.get(locators.loginbutton).should('be.visible')
        //cy.get(locators.loginbutton).click({force:true})
        cy.contains('Login').should('be.visible')
        cy.contains('Login').click()
        cy.get(locators.registerbutton).eq(4).should('be.visible')
        cy.get(locators.registerbutton).eq(4).contains('Register').click()
        cy.get(locators.FN).should('be.visible')
        cy.get(locators.FN).type(userr.firstName)
        cy.get(locators.LN).should('be.visible')
        cy.get(locators.LN).type(userr.lastName)
        cy.get(locators.UN).should('be.visible')
        cy.get(locators.UN).type(userr.userName)
        cy.get(locators.pass).should('be.visible')
        cy.get(locators.pass).type(userr.password)
        cy.get(locators.con).should('be.visible')
        cy.get(locators.con).type(userr.confirmPassword)
        cy.get(locators.radiogroup).should('be.visible')
        cy.get(locators.radiogroup).contains('Male').click()
        cy.get(locators.RegisterButton).eq(5).should('be.visible').click({force: true})
    })

    it("Login test", () => {
        cy.visit(baseURLs.baseURLs3)
        cy.get(locators.loginbutton).should('be.visible')
        cy.get(locators.loginbutton).click()
        cy.get(locators.ON).should('be.visible')
        cy.get(locators.ON).type(userr.LoginU)
        cy.get(locators.pass).should('be.visible')
        cy.get(locators.pass).type(userr.password)
       cy.get(locators.log).eq(6).should('be.visible').click({force: true})
        cy.get(locators.log).eq(6).should('not.exist')
        // cy.get(locators.Logo).contains('arrow_drop_down').click()
        // cy.contains('Logout').click()
        // cy.get(locators.loginbutton).should('be.visible')
    })
})
