import { IProductDTO } from '@/types/product';

describe('CRUD Product', () => {
  it('should create a product', () => {
    cy.visit('/admin/produtos/cadastrar');
    cy.wait(1000);
    cy.readFile('cypress/fixtures/products.json').then(
      (products: IProductDTO[]) => {
        cy.get('[name=name]').type(products[0].name);
        cy.get('[name=isbn]').type(products[0].isbn);
        cy.get('[name=author]').type(products[0].author);
        cy.get('[name=year]').type(String(products[0].year));
        cy.get('[name=publisher]').type(products[0].publisher);
        cy.get('[name=edition]').type(products[0].edition);
        cy.get('[name=numberPages]').type(String(products[0].numberPages));
        cy.get('[name=synopsis]').type(products[0].synopsis);
        cy.get('[name=height]').type(String(products[0].height));
        cy.get('[name=width]').type(String(products[0].width));
        cy.get('[name=weight]').type(String(products[0].weight));
        cy.get('[name=depth]').type(String(products[0].depth));
        cy.get('[name=priceCost]').type(String(products[0].priceCost));
        cy.get('[name=manufacturer]').type(products[0].manufacturer);
        cy.get('[data-test=priceGroup]').within(() => {
          cy.get('select').select(products[0].priceGroupId, {
            force: true
          });
        });
        for (const categorie of products[0].categories) {
          cy.get('.input-select-multiple').type(categorie);
          cy.get(".select-option").contains(`${categorie}`).last().click({
            force: true
          });
        }
      }
    );

    cy.get('[data-test=submit-button]').click();
  });
});
