describe('request switch', () => {
  it('should switch requests', () => {
    cy.visit('/compras');
    cy.get('[data-test=request-switch]').click();
    cy.get('[data-test=checkbox-0]').click();
    cy.get('[data-test=checkbox-1]').click();
    cy.get('[data-test=checkbox-2]').click();
    cy.get('[data-test=checkbox-5]').click();
    cy.get('[data-test=submit-button]').click();
  });
});
