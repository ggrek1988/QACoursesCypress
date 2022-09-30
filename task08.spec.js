//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

// Stwórzcie scenariusz, który sprawdza ilość naklejek na wszystkich artykułach 
// na stronie głównej w szkoleniowej aplikacji litecart. Naklejki 
// są to paski w lewym górnym rogu obrazu artykułu, na których jest napisane New, 
// Sale lub coś innego. Scenariusz powinien sprawdzać, czy każdy artykuł posiada tylko jedną naklejkę. 
// Można sformułować scenariusz jako test albo jako oddzielny plik wykonywalny. 
// Jeśli pojawią się problemy z wyborem lokatorów do wyszukiwania elementów – wejdźcie na czat po pomoc.
describe('Check stikers on articles', () => {
    it('checking stickers is equal on the number of articles', () => {
        cy.visit("http://localhost:1234/litecart/")

        cy.get("div[class='image-wrapper']").should("have.length",11)
        cy.get("[class^='sticker']").should("have.length",11)

        cy.get("div[class='image-wrapper']").each(($el,index)=>{

            //xPath [class^='sticker']
            //css selectors div.sticker
            //.eq(index) wypisanie wartości pojedynczo
            cy.get("div.sticker").eq(index).should("have.length",1)
            
            
           
        })
        
        

    });
});