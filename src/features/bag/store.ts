import { create } from 'zustand';

export interface bagStore {
  products: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addProduct: () => void;
  remove: () => void;
}

export const useBagStore = create<bagStore>((set) => ({
  products: 0,
  isOpen: false,
  setIsOpen: (isOpen) => set({isOpen}),
  addProduct: () => set((state) => ({products: state.products + 1})),
  remove: () => set((state) => ({products: state.products - 1})),
}))