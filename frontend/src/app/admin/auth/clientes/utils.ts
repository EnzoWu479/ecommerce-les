import { masks } from '@/helpers/masks';
import { SearchField, SearchType } from '@/types/search';
import { AccountStatus } from '@prisma/client';

export const ClientSearchFields: SearchField[] = [
  {
    name: 'name',
    label: 'Nome',
    type: SearchType.STRING
  },
  {
    name: 'email',
    label: 'Email',
    type: SearchType.STRING
  },
  {
    name: 'birth_date',
    label: 'Data de Nascimento',
    type: SearchType.DATE
  },
  {
    name: 'cpf',
    label: 'CPF',
    // mask: masks.cpf,
    type: SearchType.STRING
  },
  {
    name: 'status',
    label: 'Status',
    type: SearchType.OPTION,
    options: [
      { label: 'Ativo', value: AccountStatus.ACTIVE },
      { label: 'Inativo', value: AccountStatus.INACTIVE }
    ]
  }
];
