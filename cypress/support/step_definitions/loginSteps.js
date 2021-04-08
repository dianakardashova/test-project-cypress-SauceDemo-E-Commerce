import {enterValidCredentials} from "../actions/loginActions"
import {clickElement} from "../actions/globalActions"

import {loginForm} from "../pageObjects/pageObjects"

const {Given, When, Then, And} = require('cypress-cucumber-preprocessor/steps');

Given(/^user on the login page$/, () => {
    cy.visit('/');
});

And(/^user enters correct username & password on the corresponding fields$/, () => {
    enterValidCredentials();
});

When(/^user clicks on login button$/, () => {
    clickElement(loginForm.loginButton);
});
