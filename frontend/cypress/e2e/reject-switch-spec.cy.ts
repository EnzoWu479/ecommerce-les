export const email = 'enzo@email.com';
export const password = '12345678Aa@';

describe('reject switch', () => {
  it('should reject switch', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('[data-test=submit-button]').click();
    cy.visit('/compras');
    cy.get('[data-test=request-switch]').first().click();
    cy.get('[data-test=checkbox-0]').click();
    cy.get('[data-test=submit-button]').click();
    cy.visit('/admin/trocas');
    cy.wait(1000);
    cy.get('[data-test=reject-button]').first().click();
  });
});
