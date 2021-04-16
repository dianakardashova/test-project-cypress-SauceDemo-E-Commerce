import {
    addInventoryItemsToCart,
    addInventoryItemToCartByName,
    chooseProductsFilterValue,
    verifyIsLoggedIn,
    verifyIsOnMainPage,
    verifyNumberOfProductInCart,
    verifyProductsAreVisible,
    verifySorting, verifyTextOfButtonForProduct,
    verifyTextOfButtonsForProducts
} from "../actions/mainPageActions"
import {enterValidCredentials} from "../actions/loginActions";

import {mainPageProductsName, mainPageProductsAllNames} from "../../fixtures/testData";
import {clickElement} from "../actions/globalActions";
import {loginForm} from "../pageObjects/pageObjects";

const {Given, When, Then, And} = require('cypress-cucumber-preprocessor/steps');

const mainPageData = require('../../fixtures/mainPage.json')

Then(/^user will be logged in system$/, () => {
    verifyIsLoggedIn();
});

Given(/^user is logged in successfully$/, () => {
    cy.visit('/');
    enterValidCredentials();
    clickElement(loginForm.loginButton);
    verifyIsLoggedIn();
});

When(/^user is on main page$/, () => {
    verifyIsOnMainPage();
});

Then(/^information of all products on main page is correct$/, () => {
    verifyProductsAreVisible(mainPageProductsName);
});

And(/^user can choose one products filter (.*)$/, (dataTable) => {
    chooseProductsFilterValue(dataTable);
});

Then(/^user should have correct names information for chosen (.*)$/, (dataTable) => {
    verifySorting(dataTable, false);
});

Then(/^user should have correct prices information for chosen (.*)$/, (dataTable) => {
    verifySorting(dataTable);
});

When(/^user can add one product to cart$/, () => {
    addInventoryItemToCartByName(mainPageData.defaultProduct);
});

Then(/^user should see number (\d+) next to the shopping cart badge$/, (numberOfProducts) => {
    verifyNumberOfProductInCart(numberOfProducts);
});

Then(/^text of the button should have changed to "([^"]*)" for product$/, (textOfButton) => {
    verifyTextOfButtonForProduct(textOfButton, mainPageData.defaultProduct);
});

When(/^user can see text of the buttons "([^"]*)" for all products$/, (textOfButton) => {
    verifyTextOfButtonsForProducts(textOfButton, mainPageData.numberOfProductsOnMainPage);
});

When(/^user can add all products to cart$/, () => {
    addInventoryItemsToCart(mainPageData.numberOfProductsOnMainPage);
});

Then(/^user should see number of all products next to the shopping cart badge$/, () => {
    verifyNumberOfProductInCart(mainPageData.numberOfProductsOnMainPage);
});

Then(/^text of the buttons should have changed to "([^"]*)" for all products$/, (textOfButton) => {
    verifyTextOfButtonsForProducts(textOfButton, mainPageData.numberOfProductsOnMainPage);
});