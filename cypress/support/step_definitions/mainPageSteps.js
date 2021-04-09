import {verifyIsLoggedIn, verifyIsOnMainPage, verifyProductsAreVisible} from "../actions/mainPageActions"
import {enterValidCredentials} from "../actions/loginActions";

import {mainPageProductsName} from "../../fixtures/testData";
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