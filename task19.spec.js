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
// Wykonany w zadaniu 13 scenariusz dodawania i usuwania produktów z koszyka tak, 
// aby używał architektury wielowarstwowej.
//   klasy pomocnicze do pracy ze stroną główną (tą, na której zostaje wybrany produkt), 
//   stroną produktu (tą, na której wykonywane jest dodawanie produktu do koszyka) oraz 
//   stroną koszyka (tą, z której wykonywane jest jego usuwanie) i zaimplementuj scenariusz,
//    który nie odnosi się bezpośredniego do operacji Selenium, a działa z wyżej wymienionymi
//     obiektami (stronami).

//do page object model 2
import ShopPage from "../../support/LitecartPO/ShopPagePO"
import AddProductPages from "../../support/LitecartPO/AddProductPages"
import ShoppingCartPages from "../../support/LitecartPO/ShoppingCartPages"

describe('addtoshoppingcart', () => {
    const shopPage = new ShopPage();
    const addProductPages = new AddProductPages();
    const shoppingCartPages = new ShoppingCartPages();
    it.only('addtoshoppingcart', () => {
        
        shopPage.visit()
        
        cy.wrap([1, 2, 3]).each((num, i, array)=>{
            
            
            shopPage.selectproduct().then((el)=>


            {
                addProductPages.productbody().then(($body) => 
                {
                    if ($body.text().includes('Size')){
                        
                        
                        addProductPages.selectproduct('Small')
                        addProductPages.checkquantity().should("have.text",num)
                    }
                     else{
                        addProductPages.addproduct()
                        addProductPages.checkquantity().should("have.text",num)
                        addProductPages.mystore()
                    }
                        })
                    })
                
                    addProductPages.mystore()

           
        })

        addProductPages.checkout()
        
        shoppingCartPages.itemproduct().each(($el,index)=>{

           
            shoppingCartPages.textproduct().eq(0).invoke("text").then(($el1)=>
            {
                
                shoppingCartPages.deletebutton().eq(0).click()
                
                shoppingCartPages.checktext($el1).should("not.exist")

                //cy.get("table[class='dataTable rounded-corners'] td").should('contain',$el1).and('not.be.visible')
            })

            
            
            
        })
        
       
            
       
    });
});
