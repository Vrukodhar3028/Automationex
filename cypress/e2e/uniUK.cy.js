///<reference types = "cypress"/>
import baseurls from '../../config/config.json'
import uniUK from '../objects/uniUK.obj'
import userlog from '../fixtures/uk.json'
describe("UK login test", () => {
    it("login", () => {
        cy.visit(baseurls.baseURLs2)
        cy.get(uniUK.Login).should('be.visible').wait(10000).click()
        cy.get(uniUK.Lpage).should('be.visible')
        // cy.get(uniUK.Lpage)
        //     .find(`${uniUK.closeb} ${uniUK.logo} ${uniUK.text} ${uniUK.DOB} ${uniUK.sb}`)
        //     .should('be.visible')
        cy.get(uniUK.sb).should('be.disabled')
        cy.get(uniUK.email).type(userlog.Email)
        cy.get(uniUK.password).type(userlog.Password)
        cy.get(uniUK.dd).eq(0).scrollIntoView().should('be.visible').click({ force: true })
        cy.contains('25').click()
        cy.get(uniUK.md).eq(0).scrollIntoView().click()
        cy.contains('July').click()
        cy.get(uniUK.yd).eq(0).scrollIntoView().click()
        cy.contains('1991').click()
        cy.get(uniUK.sb).should('be.enabled').click()

    })
})
