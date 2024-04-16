import { IPage } from '@/types/page';
import { useQuery } from '@tanstack/react-query';
import { creditCardData } from '../data/credit-card';

export const useQueryCreditCardUnlist = () => {
  const query = useQuery({
    queryKey: ['credit-card', { name: 'credit-card' }],
    queryFn: async () => creditCardData.getUnlist()
  });
  return query;
};
