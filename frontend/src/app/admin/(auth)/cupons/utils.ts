import { SearchField, SearchType } from '@/types/search';

export const coupomSearchFields: SearchField[] = [
  {
    name: 'code',
    label: 'Código',
    type: SearchType.STRING
  },
  {
    name: 'discount',
    label: 'Desconto',
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
  },
  {
    name: 'expiration_date',
    label: 'Data de Expiração',
    type: SearchType.DATE
  }
];
