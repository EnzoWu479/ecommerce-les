const email = 'enzo@email.com';
const password = '12345678Aa@';

describe('request switch', () => {
  it('should switch requests', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('[data-test=submit-button]').click();
    cy.visit('/compras');
    cy.get('[data-test=request-switch]').first().click();
    cy.get('[data-test=checkbox-0]').click();
    cy.get('[data-test=checkbox-1]').click();
    cy.get('[data-test=checkbox-2]').click();
    cy.get('[data-test=submit-button]').click();
    cy.visit('/admin/trocas');
    cy.wait(1000);
    cy.get('[data-test=accept-button]').first().click();
    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-test=trade-popup]').click();
    cy.get('[data-test=retrieve-button]').first().click({
      force: true
    });
    cy.wait(1000);
  });
});
