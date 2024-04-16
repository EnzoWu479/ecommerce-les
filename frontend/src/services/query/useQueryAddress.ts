import { IPage } from '@/types/page';
import { useQuery } from '@tanstack/react-query';
import { addressData } from '../data/address';

export const useQueryClientAddress = ({ page }: IPage) => {
  const limit = 10;
  const query = useQuery({
    queryKey: ['client-address', { page, limit, name: 'address' }],
    queryFn: async () => addressData.list({ page: page || 1, limit })
  });
  return query;
};
export const useQueryDeliveryAddress = () => {
  const query = useQuery({
    queryKey: ['client-address', { name: 'delivery' }],
    queryFn: addressData.getDeliveryAddress,
  });
  return query;
};
