import { masks } from '@/helpers/masks';
import { SearchField, SearchType } from '@/types/search';

export const clientSearchFields: SearchField[] = [
  {
    name: 'id',
    label: 'Código',
    type: SearchType.STRING
  },
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
      { label: 'Ativo', value: 'Ativo' },
      { label: 'Inativo', value: 'Inativo' }
    ]
  }
];
