import { IProductDTO } from '@/types/product';

describe('CRUD Product', () => {
  it('should create a product', () => {
    cy.visit('/admin/produtos/cadastrar');
    cy.wait(1000);
    const i = 1;
    cy.readFile('cypress/fixtures/products.json').then(
      (products: IProductDTO[]) => {
        cy.get('[name=name]').type(products[i].name);
        cy.get('[name=isbn]').type(products[i].isbn);
        cy.get('[name=author]').type(products[i].author);
        cy.get('[name=year]').type(String(products[i].year));
        cy.get('[name=publisher]').type(products[i].publisher);
        cy.get('[name=edition]').type(products[i].edition);
        cy.get('[name=numberPages]').type(String(products[i].numberPages));
        cy.get('[name=synopsis]').type(products[i].synopsis);
        cy.get('[name=height]').type(String(products[i].height));
        cy.get('[name=width]').type(String(products[i].width));
        cy.get('[name=weight]').type(String(products[i].weight));
        cy.get('[name=depth]').type(String(products[i].depth));
        cy.get('[name=priceCost]').type(String(products[i].priceCost));
        cy.get('[name=manufacturer]').type(products[i].manufacturer);
        cy.get('[data-test=priceGroup]').within(() => {
          cy.get('select').select(products[i].priceGroupId, {
            force: true
          });
        });
        for (const categorie of products[i].categories) {
          cy.get('.input-select-multiple').type(categorie);
          cy.get('.select-option').contains(`${categorie}`).last().click({
            force: true
          });
        }
      }
    );

    cy.get('[data-test=submit-button]').click();
  });
});
