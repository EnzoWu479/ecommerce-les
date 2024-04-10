import { useEffect } from 'react';
import { useBagStore } from './store';
import { toast } from 'react-toastify';
import { cartData } from './data';
import { useAuthStoreClient } from '../authentication/auth-store-client';

export const useCart = () => {
  const { cart, setCart } = useBagStore();
  const { isAuthenticated } = useAuthStoreClient();

  const getData = async () => {
    try {
      const response = await cartData.getCurrentCart();
      setCart(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
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
    if (!cart && isAuthenticated) {
      getData();
    }
  }, [isAuthenticated]);

  return {
    cart,
    addProductToCart,
    updateProductAmount,
    removeProductFromCart
  };
};
