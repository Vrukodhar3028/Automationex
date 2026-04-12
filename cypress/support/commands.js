// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />
import baseurls from '../../config/config.json'
import autoex1 from '../objects/autoex.obj'
import { generateUser } from '../support/userfactory'
import Login from '../objects/autoexlogin.obj'
import autologin from '../fixtures/autologin.json'
import testcases from '../objects/testcasesauto.obj'

Cypress.Commands.add('registerUser', () => {
        const user = generateUser()
        cy.visit(baseurls.baseURLs1)
        cy.get(autoex1.clogin).click()
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
        cy.get(autoex1.creacc).should('not.exist')
})

Cypress.Commands.add('Login', ()=>{
    cy.visit(baseurls.baseURLs1)
        cy.get(autoex1.clogin).click()
        cy.url().should('include', 'login')
        cy.get(autoex1.logf).should('be.visible')
        cy.get(`${Login.Email}, ${Login.Passwor}`).should('be.visible')
        cy.get(Login.Email).type(autologin.Email)
        cy.get(Login.Passwor).type(autologin.Password)
        cy.get(Login.Loginbutton).should('be.enabled').click()
        cy.get(Login.Logoutbutton).should('be.visible')

})



