import {
    chooseProductsFilterValue,
    verifyIsLoggedIn,
    verifyIsOnMainPage,
    verifyProductsAreVisible, verifyProductsFilterActiveOption
} from "../actions/mainPageActions"
import {enterValidCredentials} from "../actions/loginActions";

import {mainPageProductsName, mainPageProductsAllNames} from "../../fixtures/testData";
import {clickElement} from "../actions/globalActions";
import {loginForm} from "../pageObjects/pageObjects";

const {Given, When, Then, And} = require('cypress-cucumber-preprocessor/steps');

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

Then(/^user should have correct information$/, () => {
    let activeOption = verifyProductsFilterActiveOption();
    for(let key in mainPageProductsAllNames){
        if(key === activeOption){
            for(let i = 0; i < mainPageProductsAllNames[key].length; i++){
                cy.get('.inventory_item_name').eq(i).should('be.visible').should('have.text', mainPageProductsAllNames[key][i])
            }
        }
    }
});