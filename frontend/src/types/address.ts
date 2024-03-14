export interface IAddress {
  id: string;
  name: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: ICity;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
}
export interface ICity {
  id: string;
  name: string;
  state: IState;
  createdAt: string;
  updatedAt: string;
}
export interface IState {
  id: string;
  name: string;
  country: ICountry;
  createdAt: string;
  updatedAt: string;
}
export interface ICountry {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
