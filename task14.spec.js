//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

// Scenariusz, który sprawdza, czy linki na stronie edycji otwierają się w nowym oknie.
// Scenariusz powinien składaćsię z następujących kroków:
// 1) Wejdź do panelu administracyjnego,

// 2) Otwórz pozycję menu Countries (lub stronę http://localhost/litecart/admin/?app=countries&doc=countries),

// 3) Otwórzedycję dowolnej strony lub rozpocznij tworzenie nowej,

// 4) Przy niektórych polach znajdują się odnośniki w postaci kwadratowej ikony ze strzałką, które przekierowują na zewnętrzne strony.
// Sprawdź czy otwierają się one w nowym oknie.

//  Oczywiście,wystarczyłobysprawdzić, czy link posiada atrybut target="_blank".
// Jednak, w tym zadaniumusisz kliknąć na link, aby się otworzył w nowym oknie, następnie przejść 
// do tego okna, zamknąć go, wrócić i powtórzyć te czynności dla wszystkich tych linków.

// Nie zapomnij, że nowe okno nie otwiera się od razu, dlatego konieczne jest dodanie 
// oczekiwania na jego otwarcie.

describe('Open second windows', () => {
      before('Log in user on Admin', () => {
       
        cy.LogAdmin(Cypress.env('username'),Cypress.env('password'))
        
    });

    it('Open second windows', () => {


        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }

        cy.contains("Countries").click()

        const randomindex = getRandomInt(0,237)
        cy.get(".fa.fa-pencil").eq(randomindex).click()
        const pagestitle = cy.get("title").text

        //.invoke('removeAttr', 'target')
        cy.get("form table a").invoke('removeAttr', 'target').each(($el,index)=>{
            if ($el.get(0).getAttribute('href') != '#') {
                
                //EXAMPLE 1
                // cy.window()
                // //alias win
                // .then((win)=>{
                //     win.location.href=$el.get(0).getAttribute('href')
                // })
                // //alias popup
                // .as('popup')

                //EXAMPLE 2
                //window.open($el.get(0).getAttribute('href'))

                //EXAMPLE 3
                cy.request({method: 'GET', url: $el.get(0).getAttribute('href'),failOnStatusCode: false}).its('status').should("be.oneOf", ([200,400,404]));

                
            }
            
           
        })
    });
});