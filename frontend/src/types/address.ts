export interface IAddress {
  id: string;
  
  zipCode: string;
  street: string;
  streetType: string;
  number: string;
  residenceType: string;
  observation: string;
  cityId: string;
  clientAddressId: null;
  createdAt: string;
  updatedAt: string;
  city: ICity;
}

export interface ICity {
  id: string;
  name: string;
  stateId: string;
  createdAt: string;
  updatedAt: string;
  state: IState;
}

export interface IState {
  id: string;
  uf: string;
  createdAt: string;
  updatedAt: string;
}
