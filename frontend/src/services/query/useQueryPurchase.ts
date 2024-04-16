import { useQuery } from '@tanstack/react-query';
import { purchaseData } from '../data/purchase';
import { PageResponse } from '@/server/shared/PageResponse';

const limit = 10;
export const useQueryPurchase = (page: number) => {
  const query = useQuery({
    queryKey: ['purchase', page],
    queryFn: async () =>
      await purchaseData.list({ page, limit: 10 })
  });
  return query;
};
