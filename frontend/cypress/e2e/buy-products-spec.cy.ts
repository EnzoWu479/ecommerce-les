import { fakerPT_BR as faker } from '@faker-js/faker';
import { ClientAddressType } from '@prisma/client';

const CEPS = ['05797380', '14405-206', '11662-010'];
const TYPES = [
  ClientAddressType.BILLING,
  ClientAddressType.RESIDENCE,
  ClientAddressType.SHIPPING
];

const email = 'enzo@email.com';
const password = '12345678Aa@';

describe('Comprar produtos', () => {
  // it('Deve adicionar produtos ao carrinho', () => {
  //   cy.visit('/');

  //   cy.get('[data-test="card-product"]').first().click();
  //   cy.get('[data-test="add-product-button"]').click();
  //   cy.get("[data-test='number-of-products']").should('have.text', '1');
  // });
  it('Deve finalizar o pedido', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('[data-test=submit-button]').click();
    cy.visit('/');

    cy.get("[data-test='card-product-1']").click();
    cy.wait(1000);
    cy.get("[data-test='add-product-button']").click();

    cy.get("[data-test='card-product-2']").click();
    cy.wait(1000);
    cy.get("[data-test=change-quantity]").within(() => {
      cy.get('[data-test=increment]').click();
    });
    cy.get("[data-test='add-product-button']").click();

    cy.get("[data-test='card-product-3']").click();
    cy.wait(1000);
    cy.get("[data-test='change-quantity']").within(() => {
      cy.get('[data-test=increment]').click();
      cy.get('[data-test=increment]').click();
    });

    cy.get("[data-test='add-product-button']").click();

    cy.get('[data-test=open-cart]').click({
      force: true
    });
    cy.get("[data-test='checkout-button']").click({
      force: true
    });

    cy.get('[data-test=add-address]').click();

    cy.get('input[name=number]').type(
      String(
        faker.number.int({
          min: 1,
          max: 9999
        })
      )
    );
    cy.get('input[name="address-name"]').type(faker.location.street());
    cy.get(`[data-test=${TYPES[1]}]`).click();
    cy.get('input[name=zipcode]').type(CEPS[1]);
    cy.readFile('cypress/fixtures/viacep.json').then(address => {
      cy.intercept(
        'GET',
        `https://viacep.com.br/ws/${CEPS[1].replace(/\D/g, '')}/json/`,
        {
          statusCode: 200,
          body: address[1]
        }
      );
    });
    cy.wait(2000);
    cy.get('[data-test=submit-button]').click();

    cy.wait(1000);
    cy.get('[data-test=add-payment]').click();

    cy.get('input[name=creditCardName]').type(faker.finance.accountName());
    cy.get('input[name=number]').type(faker.finance.creditCardNumber());
    cy.get('input[name=holderName]').type(faker.person.fullName());
    cy.get('input[name=cvv]').type(
      String(
        faker.number.int({
          min: 100,
          max: 999
        })
      )
    );
    cy.get('input[name=expiration]').type(
      // MM/YY
      `${String(
        faker.number.int({
          min: 1,
          max: 12
        })
      ).padStart(
        2,
        '0'
      )}/${String(faker.date.future().getFullYear()).slice(-2)}`
    );
    cy.get('[data-test=submit-button]').click();

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
    cy.get('[data-test=coupom-input]').type('VIOLET20');
    cy.get('[data-test=coupom-submit]').click();
    cy.get('[data-test=buy-button]').click();
    cy.wait(1000);
  });
  it('Deve finalizar o pedido com 1 produto e 1 cartão', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('[data-test=submit-button]').click();
    cy.visit('/');

    cy.get("[data-test='card-product-2']").click();
    cy.wait(1000);
    cy.get("[data-test=change-quantity]").within(() => {
      cy.get('[data-test=increment]').click();
    });
    cy.get("[data-test='add-product-button']").click();

    cy.get('[data-test=open-cart]').click({
      force: true
    });
    cy.get("[data-test='checkout-button']").click({
      force: true
    });

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
    cy.get('[data-test=buy-button]').click();
    cy.wait(1000);
  });
  it('Deve bloquear compra com cobrança menos que 10 reais no cartão', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('[data-test=submit-button]').click();
    cy.visit('/');

    cy.get("[data-test='card-product-2']").click();
    cy.wait(1000);
    cy.get("[data-test=change-quantity]").within(() => {
      cy.get('[data-test=increment]').click();
    });
    cy.get("[data-test='add-product-button']").click();

    cy.get('[data-test=open-cart]').click({
      force: true
    });
    cy.get("[data-test='checkout-button']").click({
      force: true
    });

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
        .click();
    });
    cy.get('[data-test=buy-button]').click();
    cy.wait(1000);
  });
 
});
