const {Given, When, Then, And} = require('cypress-cucumber-preprocessor/steps');

Given(/^user on the login page$/, () => {
    cy.visit('https://www.saucedemo.com');
});

And(/^user enters correct username & password on the corresponding fields$/, () => {
    cy.get('input[placeholder="Username"]').type('standard_user')
    cy.get('input[placeholder="Password"]').type('secret_sauce')
});

When(/^user clicks on login button$/, () => {
    cy.get('input[id=login-button]').click()
});

Then(/^user will be logged in system$/, () => {
    cy.get('.title').then(($elem_title) => {
        const title_text = $elem_title.text()
        expect(title_text).to.eq('Products')
    })
});