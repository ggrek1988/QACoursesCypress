//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

//  scenariusz, który wykonuje następujące czynności w aplikacji litecart.

// 1)    Wejście do panelu administratora http://localhost/litecart/admin.

// 2)    Klikanie kolejno na wszystkie punkty w menu z lewej strony, w tym w zagnieżdżone punkty.

// 3)    Dla każdej strony sprawdzenie nagłówka (to znaczy elementu z tagiem h1).

describe('Test login Admin', () => {
    beforeEach(() => {
        
        
        cy.visit("http://localhost:1234/litecart/admin/",{failOnStatusCode: false})
        cy.get("[name='username']").type("admin")
        cy.get("[name='password']").type("admin")
        
        cy.get("button[name='login']").click()
        
    });

    it('check all positions menu', () => {
        cy.get("span[class='name']").each(($el, index)=>{

            cy.log($el.text(), index)
            cy.get("span[class='name']").contains($el.text()).click()
           
            cy.get("#box-apps-menu1").then(($menu)=>{

                if ($menu.hasClass('docs')) {
                    cy.get("li[class='doc'] span[class='name']").each(($elm,index)=>
                    {
                        cy.log($elm.text(),index)
                        cy.get("span[class='name']").contains($elm.text()).click()
        
                    })
                  }
                else{
                    cy.log("aaa")
                }
                


            })
           cy.get("title").then(($text)=>{
               cy.log($text.text())
           })

        })
    });
    
});
