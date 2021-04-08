import {main} from "../pageObjects/pageObjects"

export const verifyIsLoggedIn = () => {
    cy.get(main.header.secondary.mainPageTitle).should('be.visible')
}
