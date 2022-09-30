//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

// Stwórz scenariusz rejestracji nowego użytkownika w aplikacji szkoleniowej litecart (w części klienckiej 
// sklepu, a nie w panelu administracyjnym).
// Scenariusz powinien się składać z następujących części:
// 1)Rejestracja nowego konta z unikalnym adresem mailowym (tak, aby nie kolidował
// z wcześniej utworzonymi użytkownikami),
// 2)Wylogowanie (logout), ponieważ po udanej rejestracji następuje automatyczne zalogowanie
// 3)Ponowne zalogowanie na dopiero co utworzone konto
// 4)Ponowne wylogowanie
// Można przygotować scenariusz w formie testu albo jako oddzielny plik wykonywalny.
// Nie jest wymagane przeprowadzenie kontroli, tylko same działania – wypełnienie pól, kliknięcia na 
// przyciski i linki. Jeśli scenariusz doszedł do końca, tj. nowo stworzony użytkownik mógł wykonać
//  logowanie i wylogowanie – oznacza to, że utworzenie konta przebiegło pomyślnie.
// W formularzu rejestracji jest CATPCHA, którą należy wyłączyć w panelu administracyjnym aplikacji 
// -zakładka Settings -> Security.

describe('user registration', () => {
    it('user registration', () => {
        cy.visit("http://localhost:1234/litecart/en/")

        cy.get("[name='login_form'] td").eq(4).click()

        const { faker } = require('@faker-js/faker');
        const firstName = faker.name.firstName()
        cy.get("[name='firstname']").type(firstName)
        const lastName = faker.name.lastName()
        cy.get("[name='lastname']").type(lastName)
        const address = faker.address.streetName()
        cy.get("[name='address1']").type(address)
        cy.get("[name='postcode']").type("22-222")
        const city= faker.address.city()
        cy.get("[name='city']").type(city)
        cy.get(".selection").click().then(()=>
        {
            cy.get(".select2-search__field").type("Poland{enter}")
        })
        const email = faker.internet.email()
        cy.get("[name='email']").type(email)
       
        cy.get("[name='phone']").type("123456789")
        cy.get("[name='password']").type("123")
        cy.get("[name='confirmed_password']").type("123")
       
        
        cy.get(" button[name='create_account']").click().then(()=>{

            cy.contains('Logout').click()

        })

        
        cy.get("input[name='email']").type(email)
        cy.get("input[name='password']").type("123")
        
        cy.get("button[name='login']").click()
        cy.contains('Logout').click()
        
        
    });
});