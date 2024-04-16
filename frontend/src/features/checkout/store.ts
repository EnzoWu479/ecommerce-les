import { PurchaseSchema } from '@/server/validations/purchase.schema';
import { create } from 'zustand';

export interface PaymentInfos {
  id: string;
  cut: number;
}
export interface CheckoutStore {
  infos: PurchaseSchema;
  setInfos: (infos: PurchaseSchema) => void;
  clearInfos: () => void;
}
const initialInfos: PurchaseSchema = {
  addressId: '',
  cards: [],
  coupons: []
};
export const useCheckoutStore = create<CheckoutStore>(set => ({
  infos: initialInfos,
  setInfos: infos => set({ infos }),
  clearInfos: () => set({ infos: initialInfos })
}));
