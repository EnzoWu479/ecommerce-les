import { useCart } from '@/features/bag/useCart';
import { useQuery } from '@tanstack/react-query';
import { aiData } from '../data/ai';

export const useQueryAiCartSuggestion = () => {
  const { cart } = useCart();
  const products = cart?.productCart.map((product) => product.book);
  const query = useQuery({
    queryKey: ['ai', 'cart', products],
    queryFn: aiData.complementarBookSuggestion,
    enabled: !!cart
  });
  return query;
};
