import { useEffect } from 'react';
import { useBagStore } from './store';
import { toast } from 'react-toastify';
import { cartData } from './data';
import { useAuthStoreClient } from '../authentication/auth-store-client';
import { useQuery } from '@tanstack/react-query';

export const useCart = () => {
  const { cart, setCart } = useBagStore();
  const { isAuthenticated, user } = useAuthStoreClient();
  const { data: cartD } = useQuery({
    enabled: isAuthenticated,
    queryKey: ['cart', isAuthenticated, user?.id],
    queryFn: async () => await cartData.getCurrentCart()
  });
  const total =
    cart?.productCart.reduce((acc, product) => {
      return acc + product.book.priceSell * product.amount;
    }, 0) || 0;
  const addProductToCart = async (productId: string, quantity: number = 1) => {
    const response = await cartData.addToCart(productId, quantity);
    setCart(response);
  };
  const updateProductAmount = async (productId: string, quantity: number) => {
    const response = await cartData.updateProductQuantity(productId, quantity);
    setCart(response);
  };
  const removeProductFromCart = async (productId: string) => {
    const response = await cartData.removeProductFromCart(productId);
    setCart(response);
  };
  useEffect(() => {
    if (cartD) {
      setCart(cartD);
    }
  }, [cartD]);

  return {
    cart,
    total,
    addProductToCart,
    updateProductAmount,
    removeProductFromCart
  };
};
