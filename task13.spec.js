//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />
// scenariusz, w którym towary zostaną dodane, a następnie usunięte z koszyka.
// Powinien się on składać z następujących kroków:
// 1) otwórz stronę jakiegoś towaru,
// 2) dodaj go do koszyka,
// 3) poczekaj, aż licznik towarów w koszyku odświeży się,
// 4) wróć na stronę główną i powtórz poprzednie kroki jeszcze dwa razy, aby w sumie w koszyku były      
//   trzy sztuki towaru,
// 5) otwórz koszyk (kliknij na link Checkout w prawem górnym rogu),
// 6) usuń wszystkie towary z koszyka, jeden za drugim. Po każdym usunięciu poczekaj, aż odświeży się tabela na dole.
// Możesz przygotować scenariusz jako test, albo jako oddzielny plik wykonywalny.

//import generateRandom from "../../support/random/generateRandom";
describe('addtoshoppingcart', () => {
    it('addtoshoppingcart', () => {
        
        cy.visit("http://localhost:1234/litecart/en/")

        

        cy.wrap([1, 2, 3]).each((num, i, array)=>{
            cy.log(num)
            
            cy.get("div[id='box-most-popular'] div[class='image-wrapper']").eq(4).click().then((el)=>


            {
                cy.get('body').then(($body) => 
                {
                    if ($body.text().includes('Size')){
                        
                        cy.get("[name='options[Size]']").select('Small')
                        cy.get("button[name='add_cart_product']").click()
                        cy.get("span[class='quantity']").should("have.text",num)
                    }
                     else{
                        cy.get("button[name='add_cart_product']").click()
                        cy.get("span[class='quantity']").should("have.text",num)
                        cy.get("img[title='My Store']").click()
                    }
                        })
                    })
                
                    cy.get("img[title='My Store']").click()

           
        })

        cy.get("div[id='cart'] a[class='link']").click()
        
        cy.get("li.shortcut").each(($el,index)=>{

           
            cy.get("div[class='viewport'] strong").eq(0).invoke("text").then(($el1)=>
            {
                
                cy.get("button[name='remove_cart_item']").eq(0).click()
                cy.contains($el1).should("not.exist")

                //cy.get("table[class='dataTable rounded-corners'] td").should('contain',$el1).and('not.be.visible')
            })

            
            
            
        })
        
       
            
       
    });
});