import { fakerPT_BR as faker } from '@faker-js/faker';
import { ClientAddressType, Gender } from '@prisma/client';

const CEPS = ['05797380', '14405-206', '11662-010'];
const NUMBER_OF_ADDRESSES = 3;
const TYPES = [
  ClientAddressType.BILLING,
  ClientAddressType.RESIDENCE,
  ClientAddressType.SHIPPING
];
const NUMBER_OF_CARDS = 2;

// faker./
describe('crud client', () => {
  const name = faker.internet.userName();
  const email = faker.internet.email();
  const cpf = String(
    faker.number.int({
      min: 10000000000,
      max: 99999999999
    })
  );

  const birthDate = faker.date
    .past({
      refDate: new Date(2000, 1, 1)
    })
    .toISOString()
    .split('T')[0];
  const search = new URLSearchParams();
  search.set('cpf', cpf);

  it('should fill client form correctly', () => {
    cy.visit('/criar-conta');
    cy.get('input[name=name]').type(name);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=birthDate]').type(birthDate);
    cy.get('input[name=cpf]').type(cpf);
    cy.get('[data-test=gender-select]').within(() => {
      cy.get('select').select(
        Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
        {
          force: true
        }
      );
    });
    const password = faker.internet.password() + '@';
    cy.get('input[name=password]').type(password);
    cy.get('input[name=passwordConfirmation]').type(password);
    cy.get('button[data-test=add-address-button]').click().click();
    for (let i = 0; i < NUMBER_OF_ADDRESSES; i++) {
      cy.get(`div[data-test='address-form[${i}]']`).within(() => {
        cy.get('input[name=number]').type(
          String(
            faker.number.int({
              min: 1,
              max: 9999
            })
          )
        );
        cy.get('input[name="address-name"]').type(faker.location.street());
        cy.get(`[data-test=${TYPES[i]}]`).click();
        cy.get('input[name=zipcode]').type(CEPS[i]);
        // cy.wait(1000);
      });
    }
    cy.get('button[data-test=add-credit-card-button]').click();
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
      cy.get(`div[data-test='creditcard-form[${i}]']`).within(() => {
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
      });
    }
    cy.get('button[data-test=save-button').click();
    expect(
      cy
        .get('.Toastify__toast-container')
        .find('.Toastify__toast--success')
        .should('have.length', 1)
    );
  });
  it('should update client', () => {
    cy.visit(`/admin/clientes?${search.toString()}`);
    cy.wait(1000);
    expect(cy.get('[data-test=client-name]').should('have.text', name));
    cy.get('a[data-test=edit-item]').click({});
    const newname = faker.internet.userName();
    cy.get('input[name=name]').clear().type(newname);
    cy.get('button[data-test=save-button').click();
    expect(
      cy
        .get('.Toastify__toast-container')
        .find('.Toastify__toast--success')
        .should('have.length', 1)
    );
    cy.visit(`/admin/clientes?${search.toString()}`);
    cy.wait(1000);
    expect(cy.get('[data-test=client-name]').should('have.text', newname));
    expect(cy.get('tbody tr').should('have.length', 1));
  });
  it('should delete client', () => {
    cy.visit(`/admin/clientes?${search.toString()}`);
    expect(cy.get('tbody tr').should('have.length', 1));
    cy.wait(1000);
    // cy.get('button[data-test=delete-button]').first().click();
    // console.log(cy.get('button[data-test=delete-button]'));
    // cy.get('button[data-test=delete-button]').first().click();
    cy.get('button[data-test=delete-button]').click({
      force: true
    });
    cy.get('button[data-test=confirm-delete-button]').click({
      force: true
    });
    // cy.get('[data-test=delete-item]').within(() => {
    // });

    // cy.get('[data-test=confirm-delete-button]').click();
    expect(cy.get('tbody tr').should('have.length', 0));
  });
});
