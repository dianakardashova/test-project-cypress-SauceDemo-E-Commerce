import {verifyIsLoggedIn} from "../actions/mainPageActions"

const {Given, When, Then, And} = require('cypress-cucumber-preprocessor/steps');

Then(/^user will be logged in system$/, () => {
    verifyIsLoggedIn();
});