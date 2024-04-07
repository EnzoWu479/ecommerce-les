describe('request switch', () => {
  it('should switch requests', () => {
    cy.visit('/compras');
    cy.get('[data-test=request-switch]').click();
    cy.get('[data-test=checkbox-0]').click();
    cy.get('[data-test=checkbox-1]').click();
    cy.get('[data-test=checkbox-2]').click();
    cy.get('[data-test=checkbox-5]').click();
    cy.get('[data-test=submit-button]').click();
    cy.visit('/admin/trocas');
    cy.wait(1000);
    cy.get('[data-test=accept-button]').click();
    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-test=trade-popup]').click();
    cy.get('[data-test=retrieve-button]').click();
  });
});
