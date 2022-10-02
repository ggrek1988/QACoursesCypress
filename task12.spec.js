//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

// Scenariusz dodania nowego artykułu (produktu) w aplikacji litecart (przez panel administracyjny).
// Aby dodać przedmiot należy otworzyć menu Catalog, kliknąć w przycisk Add New Product znajdujący w prawym 
// górnym rogu, wypełnić pola z informacją o artykule i zapisać.
// Wystarczy wypełnić tylko informacje na kartach General, Information i Prices.
//  Na tej ostatniej nie ma potrzeby dodawania rabatu (Compains).
// Po zapisaniu artykułu w panelu administracyjnym należy upewnić się, że pojawił się w katalogu.
// W części sklepu, przeznaczonej dla klientów nie trzeba tego sprawdzać.
import { getRandomInt } from './generate_random'

describe('add article', () => {
    beforeEach('Log in user on Admin', () => {
        cy.visit("http://localhost:1234/litecart/admin/",{failOnStatusCode: false})
        cy.LogAdmin(Cypress.env('username'),Cypress.env('password'))
        
    });
    it('add article', () => {
        

        cy.contains('Catalog').click()
        cy.contains('Add New Product').click()
       

     //#GENERAL
    //1.Status
    cy.get("input[type='radio'][value='1']").click()
  
    //2. Name
    //const randname = getRandomInt(1,100)
    const randname = getRandomInt(1,100)
    const testname = 'Product'+randname
    cy.get("input[name='name[en]']").type(testname)
    
    //#3.code
    const randcode = getRandomInt(1,999999)
    const code = 'Product'+randcode
    cy.get("input[name='code']").type(testname)

   // #4. Categories
   cy.get("input[name='categories[]'][value='1']").click()


    // #5.Product Groups
    cy.get("input[name='product_groups[]'][value='1-2']").click()
    
    // #6 quantity
    cy.get("input[name='quantity']").type('3.00')
    

    // #7 Date Valid From
    cy.window().then((win) => { 
        win.document.getElementsByName('date_valid_from')[0].value = "2022-03-01" 
     });
    
    
    // #8 Date Valid To
    cy.window().then((win) => { 
        win.document.getElementsByName('date_valid_to')[0].value = "2022-03-31" 
     });
    
     //#Information
     //#1 open tab
     cy.contains('Information').click()

    //#2 Manufacturer
    cy.get("[name='manufacturer_id']").select('ACME Corp.')
 
    // #3 Keywords
    cy.get("input[name='keywords']").type('keywords')
 
    //  #4 Short Descriptions
    cy.get("input[name='short_description[en]']").type('short_description')
    
 
    //  #5 Description
    cy.get("div[class='trumbowyg-editor']").type('Description')
    
 
    //  #5 Head Title
    cy.get("input[name='head_title[en]']").type('Head Title')
   
 
    //  #6 Meta Description
    cy.get("input[name='meta_description[en]']").type('Meta Description')
    
    //# Prices
    //#1 open tab
    cy.contains('Prices').click()
  
    //# Purchase Price
    cy.get("input[name='purchase_price']").type('3.00')
    cy.get("[name='purchase_price_currency_code']").select('Euros')
 

    //#3 Price, Price Incl. Tax (?)
    cy.get("input[name='prices[USD]']").type('10.00')
    cy.get("input[name='prices[EUR]']").type('13.00')
   

    // #4 Campaigns
    cy.get("a[id='add-campaign'] i[class='fa fa-plus-circle']").click()
    cy.window().then((win) => { 
        win.document.getElementsByName('campaigns[new_1][start_date]')[0].value = "2022-03-17T01:02" 
     });
     cy.window().then((win) => { 
        win.document.getElementsByName("campaigns[new_1][end_date]")[0].value = "2022-03-31T01:02" 
     });
     cy.get("input[name='campaigns[new_1][USD]']").type('2.00')
    

    // #save product
    cy.get("button[name='save']").click()
    
    // #assertion check the product on the list
    cy.wait(2000)
    cy.contains(testname).should("be.visible").and("have.length",1)
    


 

    });
});
