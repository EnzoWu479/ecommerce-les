import { SearchField, SearchType } from '@/types/search';

export const productSearchFields: SearchField[] = [
  {
    name: 'name',
    label: 'Nome',
    type: SearchType.STRING
  },
  {
    name: 'sku_code',
    label: 'Código SKU',
    type: SearchType.STRING
  },
  {
    name: 'manufacturer',
    label: 'Fabricante',
    type: SearchType.STRING
  },
  {
    name: 'category',
    label: 'Categoria',
    type: SearchType.STRING
  }
];
