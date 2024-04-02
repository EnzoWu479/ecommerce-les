describe('login form', () => {
  it('should visit the login form', () => {
    cy.visit('/admin');
    cy.get("input[name='email']").type("admin@email.com");
    cy.get("input[name='password']").type("admin@email.com");
    
  });
});
