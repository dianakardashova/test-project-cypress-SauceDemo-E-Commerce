import {main} from "../pageObjects/pageObjects"
import {mainPageTitle, mainPageActiveOption} from "../../fixtures/testData"

export const verifyIsLoggedIn = () => {
    cy.get(main.header.secondary.mainPageTitle).should('be.visible').should('have.text', mainPageTitle)
}

export const verifyIsOnMainPage = () => {
    cy.get(main.header.secondary.productsFilterActiveOption).should('be.visible')
        .should('have.text', mainPageActiveOption)
}

export const verifyProductsAreVisible = (dataArray) => {
    let itemsAmount = dataArray.length

    for (let i in dataArray){
        cy.get('.inventory_item_name').eq(i).should('be.visible').should('have.text', dataArray[i])
    }
}