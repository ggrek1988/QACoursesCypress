//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

// Sprawdzenie czy przy kliknięciu na towar otwiera się właściwa strona 
// towaru w aplikacji litecart.

// 1) Otwarcie strony głównej
// 2) Kliknijcie na pierwszy towar w kategorii Campaigns
// 3) Sprawdzenie, czy otwiera się strona właściwego towaru

// Sprawdzenie, czy:
// а) zgadza się tekst nazwy towaru
// b) zgadza się cena (obie ceny)

// Sprawdzanie style ceny na stronie głównej i na stronie towaru - 
// pierwsza cena jest szara i przekreślona, a druga cena jest czerwona i pogrubiona.

describe('Task 10: check title, price and text on two pages', () => {
    
    it('Check only two pages and title', () => {

        cy.visit("http://localhost:1234/litecart/en/")
        cy.get("div#box-campaigns li").each(($namespace,index)=>
        {   
            
            cy.get('div#box-campaigns div.name').eq(index).invoke('text').then(($name)=>
            {   
                cy.get("div#box-campaigns a.link").click()
                cy.get("h1.title").should("contain",$name)
            })

        })
    });

    it('Check only regular-price', () => {

        cy.visit("http://localhost:1234/litecart/en/")
        cy.get("div#box-campaigns li").each(($namespace,index)=>
        {   
            cy.get('div#box-campaigns s.regular-price').should('have.prop', 'tagName' ).should('eq', 'S')
            cy.get('div#box-campaigns s.regular-price').should('have.css', 'color', 'rgb(119, 119, 119)')

            cy.get('div#box-campaigns s.regular-price').eq(index).invoke('text').then(($regular_price)=>
            {      

                cy.get("div#box-campaigns a.link").click()
                cy.get("div.information .regular-price").should("contain",$regular_price)
                cy.get('div.information .regular-price').should('have.prop', 'tagName' ).should('eq', 'S')
                cy.get('div.information .regular-price').should('have.css', 'color', 'rgb(102, 102, 102)')

            })

         })
    });

    it('Check only campaign-price', () => {

        cy.visit("http://localhost:1234/litecart/en/")
        cy.get("div#box-campaigns li").each(($namespace,index)=>
        {   
            cy.get('div#box-campaigns .campaign-price').should('have.prop', 'tagName' ).should('eq', 'STRONG')
            cy.get('div#box-campaigns .campaign-price').should('have.css', 'color', 'rgb(204, 0, 0)')

            cy.get('div#box-campaigns .campaign-price').eq(index).invoke('text').then(($campaign_price)=>
            {      

                cy.get("div#box-campaigns a.link").click()
                cy.get("div.information .campaign-price").should("contain",$campaign_price)
                cy.get('div.information .campaign-price').should('have.prop', 'tagName' ).should('eq', 'STRONG')
                cy.get('div.information .campaign-price').should('have.css', 'color', 'rgb(204, 0, 0)')

            })

            


                
        })
    });

  
});
