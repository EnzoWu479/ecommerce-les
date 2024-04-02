import { create } from 'zustand';

export interface CheckoutInfos {
  address_id: string;
  payments: PaymentInfos[];
  coupons_id: string[];
}
export interface PaymentInfos {
  id: string;
  cut: number;
}
export interface CheckoutStore {
  infos: CheckoutInfos;
  setInfos: (infos: CheckoutInfos) => void;
  clearInfos: () => void;
}
const initialInfos: CheckoutInfos = {
  address_id: '',
  payments: [],
  coupons_id: []
};
export const useCheckoutStore = create<CheckoutStore>(set => ({
  infos: initialInfos,
  setInfos: infos => set({ infos }),
  clearInfos: () => set({ infos: initialInfos })
}));
