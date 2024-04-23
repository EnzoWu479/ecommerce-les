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
export const useQueryCreditCardList = ({ page }: IPage) => {
  const query = useQuery({
    queryKey: ['credit-card', { page }],
    queryFn: async () =>
      creditCardData.list({
        page: page || 1,
        limit: 10
      })
  });
  return query;
};
export const useQueryCreditCardItem = (id?: string) => {
  const query = useQuery({
    queryKey: ['credit-card', { id }],
    enabled: !!id,
    queryFn: async () => creditCardData.getById(id!)
  });
  return query;
};
