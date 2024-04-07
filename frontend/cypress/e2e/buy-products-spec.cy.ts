const user = {
  email: 'enwu2014@hotmail.com',
  password: '12345678Aa@'
};
describe('Comprar produtos', () => {
  it('Deve adicionar produtos ao carrinho', () => {
    cy.visit('/');

    cy.get('[data-test="card-product"]').first().click();
    cy.get('[data-test="add-product-button"]').click();
    cy.get("[data-test='number-of-products']").should('have.text', '1');
  });
  it('Deve finalizar o pedido', () => {
    cy.visit('/');

    cy.get("[data-test='card-product']").first().click();
    cy.get("[data-test='add-product-button']").click();

    cy.get('[data-test=open-cart]').click({
      force: true
    });
    cy.get("[data-test='checkout-button']").click();
    cy.get('[data-test=address-1]').click();
    cy.get('[data-test=payment-1]').within(() => {
      cy.get('[data-test=checkbox]').click();
      cy.get('[data-test=increment]')
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click();
    });
    cy.get('[data-test=payment-2]').within(() => {
      cy.get('[data-test=checkbox]').click();
      cy.get('[data-test=increment]')
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click();
    });
    cy.get('[data-test=coupom-input]').type('VIOLET10');
    cy.get('[data-test=coupom-submit]').click();
    cy.get('[data-test=coupom-input]').type('VIOLET15');
    cy.get('[data-test=coupom-submit]').click();
    cy.get('[data-test=buy-button]').click();
  });
  it('Deve mudar status de compra', () => {
    cy.visit('/admin/vendas');
    cy.wait(1000);
    cy.get('[data-test=select-trade]').within(() => {
      cy.get('button').click();
    });
    cy.contains('Em transporte').click();
    cy.wait(500);
    cy.get('[data-test=select-trade]').within(() => {
      cy.get('button').click();
    });
    cy.contains('Em transito').click();
    cy.wait(500);
    cy.get('[data-test=select-trade]').within(() => {
      cy.get('button').click();
    });
    cy.contains('Entregue').click();
    cy.wait(500);
  });
});
