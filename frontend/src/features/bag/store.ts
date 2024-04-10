import { ICart } from '@/types/cart';
import { create } from 'zustand';

export interface bagStore {
  cart: ICart | null;
  setCart: (cart: ICart) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useBagStore = create<bagStore>(set => ({
  cart: null,
  setCart: cart => set({ cart }),
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen })
}));
