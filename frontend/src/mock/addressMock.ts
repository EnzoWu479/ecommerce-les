import { IAddress } from '@/types/address';

export const addressMock: IAddress[] = [
  {
    id: '1',
    // name: 'Casa',
    street: 'Rua A',
    number: '123',
    cityId: '1',
    clientAddressId: null,
    observation: 'Casa com portão azul',
    residenceType: 'Casa',
    streetType: 'Rua',
    // complement: 'Apto 1',
    // neighborhood: 'Centro',
    city: {
      id: '1',
      stateId: '1',
      name: 'São Paulo',
      state: {
        id: '1',
        uf: 'SP',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      },
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01'
    },
    zipCode: '12345-678',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01'
  },
  {
    id: '2',
    // name: 'Trabalho',
    street: 'Rua B',
    number: '456',
    cityId: '2',
    clientAddressId: null,
    observation: 'Prédio com portaria',
    residenceType: 'Apartamento',
    streetType: 'Rua',
    // complement: 'Apto 2',
    // neighborhood: 'Centro',
    city: {
      id: '2',
      stateId: '2',
      name: 'Rio de Janeiro',
      state: {
        id: '2',
        uf: 'RJ',

        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      },
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01'
    },
    zipCode: '98765-432',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01'
  }
  // Add more addresses here...
];
