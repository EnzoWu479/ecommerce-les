import { useQuery } from '@tanstack/react-query';
import { categoryData } from '../data/category';

export const useQueryCategory = () => {
  const query = useQuery({
    queryKey: ['category'],
    queryFn: async () => categoryData.getAll()
  });
  return query;
};
