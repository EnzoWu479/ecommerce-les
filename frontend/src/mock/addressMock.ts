import { IAddress } from '@/types/address';

export const addressMock: IAddress[] = [
  {
    id: '1',
    name: 'Casa',
    street: 'Rua A',
    number: '123',
    complement: 'Apto 1',
    neighborhood: 'Centro',
    city: {
      id: '1',
      name: 'São Paulo',
      state: {
        id: '1',
        name: 'SP',
        country: {
          id: '1',
          name: 'Brazil',
          createdAt: '2021-01-01',
          updatedAt: '2021-01-01'
        },
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
    name: 'Trabalho',
    street: 'Rua B',
    number: '456',
    complement: 'Apto 2',
    neighborhood: 'Centro',
    city: {
      id: '2',
      name: 'Rio de Janeiro',
      state: {
        id: '2',
        name: 'RJ',
        country: {
          id: '1',
          name: 'Brazil',
          createdAt: '2021-01-01',
          updatedAt: '2021-01-01'
        },
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
