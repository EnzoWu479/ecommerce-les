export interface ICreditCard {
  id: string;
  name: string;
  number: string;
  cvv: string;
  expDate: string;
  holderName: string;
  brandId: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  mainCardId: null;
  brand: IBrand;
  mainCard: null;
}
export interface IBrand {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}
