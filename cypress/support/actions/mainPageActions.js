import {main} from "../pageObjects/pageObjects"
import {mainPageTitle, mainPageProductsFilterActiveOption} from "../../fixtures/testData"

export const verifyIsLoggedIn = () => {
    cy.get(main.header.secondary.mainPageTitle).should('be.visible').should('have.text', mainPageTitle)
}

export const verifyIsOnMainPage = () => {
    cy.get(main.header.secondary.productsFilterActiveOption).should('be.visible')
        .should('have.text', mainPageProductsFilterActiveOption)
}

export const verifyProductsAreVisible = (dataArray) => {
    let itemsAmount = dataArray.length

    for (let i in dataArray){
        cy.get('.inventory_item_name').eq(i).should('be.visible').should('have.text', dataArray[i])
    }
}

export const chooseProductsFilterValue = (desiredValue) => {
    cy.get('[data-test=product_sort_container]').select(desiredValue);
}

export const getProductsFilterActiveOption = () => {
    let textActiveOption = Cypress.$(main.header.secondary.productsFilterActiveOption).text()
    return textActiveOption;
}

//get inventory items names or prices, using selector
const getInventoryItems = (selector) => {
    let inventoryItems = [];
    let tmp;
    let inventoryItemsLength = Cypress.$(selector).length;

    for(let i = 0; i < inventoryItemsLength; i++){
        tmp = Cypress.$(selector).eq(i).text()

        if (tmp.includes('$')) {
            tmp = parseFloat(tmp.replace('$', ''));
        }
        inventoryItems.push(tmp)
    }
    return inventoryItems
}

export const verifySorting = (sortingType, isNumber=true) => {
    let sortingOption
    let inventoryItems

    if (isNumber) {
        inventoryItems = getInventoryItems(main.body.inventoryItemPrice);
        sortingOption = (a, b) => a - b
    }
    else {
        inventoryItems = getInventoryItems(main.body.inventoryItemName);
        sortingOption = undefined
    }
    let inventoryItemsToCompare = Object.assign([], inventoryItems);

    if (sortingType === "Name (A to Z)" || sortingType === "Price (low to high)") {
        inventoryItems.sort(sortingOption)
    } else if (sortingType === "Name (Z to A)" || sortingType === "Price (high to low)") {
        console.log(sortingType)
        inventoryItems.sort(sortingOption).reverse()
    }

    expect(inventoryItemsToCompare).to.deep.eq(inventoryItems)
};

export const indexOfDesiredInventoryItem = (inventoryItemName) => {
    let inventoryItems = getInventoryItems(main.body.inventoryItemName);

    for(let i = 0; i < inventoryItems.length; i++){
        if (inventoryItems[i] === inventoryItemName){
            return i;
        }
    }
}

export const addInventoryItemToCartByName = (inventoryItemName) => {
    cy.get(main.body.inventoryItemButton).eq(indexOfDesiredInventoryItem(inventoryItemName)).click();
}

export const addInventoryItemsToCart = (numberOfProducts) => {
    cy.get(main.body.inventoryItemButton).then(($buttons) => {
        for (let i = 0; i < numberOfProducts; i++){
           $buttons[i].click();
        }
    });
}

export const verifyNumberOfProductInCart = (numberOfProducts) => {
    cy.get(main.header.primary.shoppingCartBadge).should('be.visible').should('have.text', numberOfProducts);
}

export const verifyTextOfButtonForProduct = (textOfButton, inventoryItemName) => {
    cy.get(main.body.inventoryItemButton).eq(indexOfDesiredInventoryItem(inventoryItemName)).should('have.text', textOfButton);
}

export const verifyTextOfButtonsForProducts = (textOfButton, numberOfProducts) => {
    cy.get(main.body.inventoryItemButton).should(($buttons) => {
        expect($buttons).to.have.length(numberOfProducts);
        for (let i = 0; i < numberOfProducts; i++){
            expect($buttons.eq(i)).to.contain(textOfButton);
        }
    });
}
