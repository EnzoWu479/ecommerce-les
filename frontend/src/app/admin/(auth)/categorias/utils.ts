import { masks } from '@/helpers/masks';
import { SearchField, SearchType } from '@/types/search';

export const categorySearchFields: SearchField[] = [
  {
    name: 'name',
    label: 'Nome',
    type: SearchType.STRING
  },
];
