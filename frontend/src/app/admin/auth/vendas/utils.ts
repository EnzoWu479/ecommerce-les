import { masks } from '@/helpers/masks';
import { SearchField, SearchType } from '@/types/search';

export const sellSearchFields: SearchField[] = [
  {
    name: 'client',
    label: 'Cliente',
    type: SearchType.STRING
  },
  {
    name: 'date',
    label: 'Data da compra',
    type: SearchType.DATE
  },
  {
    name: 'price',
    label: 'Preço total',
    type: SearchType.STRING
  },
  {
    name: 'status',
    label: 'Status',
    // mask: masks.cpf,
    type: SearchType.OPTION,
    options: [
      { label: 'Aguardando pagamento', value: 'Aguardando pagamento' },
      { label: 'Em transporte', value: 'Em transporte' },
      { label: 'Entregue', value: 'Entregue' },
      { label: 'Cancelado', value: 'Cancelado' }
    ]
  }
];
