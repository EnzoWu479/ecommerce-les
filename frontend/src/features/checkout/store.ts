import { PurchaseFormSchema } from '@/server/validations/purchase.schema';
import { create } from 'zustand';

export interface PaymentInfos {
  id: string;
  cut: number;
}
export interface CheckoutStore {
  infos: PurchaseFormSchema;
  setInfos: (infos: PurchaseFormSchema) => void;
  clearInfos: () => void;
}
const initialInfos: PurchaseFormSchema = {
  addressId: '',
  cards: [],
  coupons: []
};
export const useCheckoutStore = create<CheckoutStore>(set => ({
  infos: initialInfos,
  setInfos: infos => set({ infos }),
  clearInfos: () => set({ infos: initialInfos })
}));
