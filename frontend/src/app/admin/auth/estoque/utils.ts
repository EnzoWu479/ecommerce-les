import { SearchField, SearchType } from '@/types/search';

export const stockSearchFields: SearchField[] = [
  {
    name: 'product',
    label: 'Produto',
    type: SearchType.STRING
  }
];
