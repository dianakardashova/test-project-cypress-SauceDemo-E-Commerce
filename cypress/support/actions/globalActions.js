export const clickElement = (element) => {
    cy.get(element).click();
}