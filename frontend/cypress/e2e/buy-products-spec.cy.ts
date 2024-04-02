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

    cy.get("[data-test='open-cart'").click();
    cy.get("[data-test='checkout-button']").click();
  });
});
