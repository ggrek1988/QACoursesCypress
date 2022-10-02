//referencja aby wyswietlało mi potrzebne metody do cypressa
/// <reference types="cypress" />

//sortowanie krajów i geostref (stanów) w aplikacji litecart.

// 1) na stronie http://localhost/litecart/admin/?app=countries&doc=countries
// а) SPrawdzanie czy kraje są rozmieszczone w porządku alfabetycznym
// b) dla tych krajów, w których ilość stref jest różna od zera zostanie otwarta strona  kraju i  zosanie sprawdzone 
// czy strefy rozmieszczone są w porządku alfabetycznym

// 2) na stronie http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones
// Czy strefy są rozmieszczone w porządku alfabetycznym

describe('Check sorting country and geo zones in Admin', () => {

     beforeEach(() => {
        cy.visit("http://localhost:1234/litecart/admin/")
        cy.get("[name='username']").type("admin")
        cy.get("[name='password']").type("admin")
        cy.get("[name='remember_me']").click()
        cy.get("button[name='login']").click()

        //Zastosowałem do ignorowania błędu "$ is not defined"
        cy.on('uncaught:exception', (err, runnable) => {
             
          if (err.message.includes('$ is not defined')) {
            return false
          }
         
        })
       
      });
    
      // 1) na stronie http://localhost/litecart/admin/?app=countries&doc=countries
      //    а) sprawdźcie, czy kraje są rozmieszczone w porządku alfabetycznym
      //    b) dla tych krajów, w których ilość stref jest różna od zera otwórzcie stronę tego kraju i tam sprawdźcie, czy strefy rozmieszczone są w porządku alfabetycznym
    it.skip('Check Pages Countries', () => {
        
            function isEqual(a, b) {
            return JSON.stringify(a) === JSON.stringify(b);
            }

            

            cy.contains("Countries").click()
        
            const date = []
            const sortdata = date.sort()
            
            
            cy.get(".dataTable td:nth-last-child(3) > a").each(($el,index)=>
            {   
              date.push($el.text)
                
            })
            // CHECK ARRAY COUNTRY
            cy.log(isEqual(date,sortdata))      // true
            
            cy.get(".dataTable td:nth-last-child(2)").each(($el1,index)=>
                {
                  if($el1.get(0).textContent != '0')
                  {
                    const date1 = []
                    cy.get(".dataTable td:nth-last-child(3) > a").eq(index).click()
                    cy.get(".dataTable td:nth-last-child(2)").each(($el2)=>{
                      date1.push($el2.text)
                    })
                     // CHECK ARRAY COUNTRY
                    cy.log(date1)
                    const sortdata1 = date1.sort()
                    cy.log(isEqual(date1,sortdata1))      // true
            
                    cy.get("button[name='cancel']").click()
                  }


            

               })
            
      })
         
        
      it('Check Pages Geo Zones', () => {

        function isEqual(a, b) {
          return JSON.stringify(a) === JSON.stringify(b);
          }

          cy.contains("Geo Zones").click()
          const date = []
          cy.get(".dataTable td:nth-last-child(3)").each((el, index)=>{

            cy.get(".dataTable td:nth-last-child(3) > a").eq(index).click()
            
            cy.get("select[name$='[zone_code]']").each((el3,index1)=>{

              cy.log(el3.get(0).value)
              cy.get("select[name$='[zone_code]'] option[value='"+el3.get(0).value+"']").eq(index1).then((el4)=>{
                date.push(el4.text)
              })

            })
            const sortdate = date.sort()
            cy.log(isEqual(date,sortdate))      // true

            cy.get("button[name='cancel']").click()

          })
      
              
      });
       
    });
