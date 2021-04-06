import {loginForm} from "../pageObjects/pageObjects";

export const enterValidCredentials = () => {
    const env = Cypress.env("environment")

    cy.get(loginForm.usernameInput)
        .type(Cypress.env(env).username)
        .get(loginForm.passwordInput)
        .type(Cypress.env(env).password) //{log: false}
}