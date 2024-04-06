import { fakerPT_BR as faker } from '@faker-js/faker';
import { ClientAddressType, Gender } from '@prisma/client';

describe('crud sad client', () => {
  const TYPES = [
    ClientAddressType.BILLING,
    ClientAddressType.RESIDENCE,
    ClientAddressType.SHIPPING
  ];
  const CEPS = ['05797380', '14405-206', '11662-010'];

  const birthDate = faker.date
    .past({
      refDate: new Date(2000, 1, 1)
    })
    .toISOString()
    .split('T')[0];
  it('should block for repeated cpf', () => {
    const repeatedCpf = String(
      faker.number.int({
        min: 10000000000,
        max: 99999999999
      })
    );
    const fill = () => {
      const name = faker.internet.userName();
      const email = faker.internet.email();
      cy.get('input[name=name]').type(name);
      cy.get('input[name=email]').type(email);
      cy.get('input[name=birthDate]').type(birthDate);
      cy.get('input[name=cpf]').type(repeatedCpf);
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
      // cy.get('button[data-test=add-address-button]').click().click();
      cy.get(`div[data-test='address-form[${0}]']`).within(() => {
        cy.get('input[name=number]').type(
          String(
            faker.number.int({
              min: 1,
              max: 9999
            })
          )
        );
        cy.get('input[name="address-name"]').type(faker.location.street());
        cy.get(`[data-test=${TYPES[0]}]`).click();
        cy.get(`[data-test=${TYPES[1]}]`).click();
        cy.get(`[data-test=${TYPES[2]}]`).click();
        cy.get('input[name=zipcode]').type(CEPS[0]);
        // cy.wait(1000);
      });

      // cy.get('button[data-test=add-credit-card-button]').click();
      cy.get(`div[data-test='creditcard-form[${0}]']`).within(() => {
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
    };
    cy.visit('/criar-conta');
    fill();
    cy.get('button[data-test=save-button').click();
    expect(
      cy
        .get('.Toastify__toast-container')
        .find('.Toastify__toast--success')
        .should('have.length', 1)
    );
    cy.visit('/criar-conta');
    fill();
    cy.get('button[data-test=save-button').click();
    expect(
      cy
        .get('.Toastify__toast-container')
        .find('.Toastify__toast--error')
        .should('have.length', 1)
        .should('have.text', 'CPF já está em uso')
    );
  });
  it('should block for repeated email', () => {
    const email = faker.internet.email();
    const fill = () => {
      const name = faker.internet.userName();
      const cpf = String(
        faker.number.int({
          min: 10000000000,
          max: 99999999999
        })
      );
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
      // cy.get('button[data-test=add-address-button]').click().click();
      cy.get(`div[data-test='address-form[${0}]']`).within(() => {
        cy.get('input[name=number]').type(
          String(
            faker.number.int({
              min: 1,
              max: 9999
            })
          )
        );
        cy.get('input[name="address-name"]').type(faker.location.street());
        cy.get(`[data-test=${TYPES[0]}]`).click();
        cy.get(`[data-test=${TYPES[1]}]`).click();
        cy.get(`[data-test=${TYPES[2]}]`).click();
        cy.get('input[name=zipcode]').type(CEPS[0]);
        // cy.wait(1000);
      });

      // cy.get('button[data-test=add-credit-card-button]').click();
      cy.get(`div[data-test='creditcard-form[${0}]']`).within(() => {
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
    };
    cy.visit('/criar-conta');
    fill();
    cy.get('button[data-test=save-button').click();
    expect(
      cy
        .get('.Toastify__toast-container')
        .find('.Toastify__toast--success')
        .should('have.length', 1)
    );
    cy.visit('/criar-conta');
    fill();
    cy.get('button[data-test=save-button').click();
    expect(
      cy
        .get('.Toastify__toast-container')
        .find('.Toastify__toast--error')
        .should('have.length', 1)
        .should('have.text', 'Email já está em uso')
    );
  });
});
