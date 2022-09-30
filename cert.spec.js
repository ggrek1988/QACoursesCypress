
//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

describe('SSL certyficate is not on pages', () => {
    it('SSL certyficate is not on pages', () => {
        cy.visit("https://expired.badssl.com/")
    });
});