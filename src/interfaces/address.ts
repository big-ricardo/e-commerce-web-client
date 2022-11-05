export default interface Address {
  id?: number;
  street: string;
  complement: string;
  neighborhood: string;
  city: City;
}

export interface AddressCreate {
  street: string;
  complement: string;
  neighborhood: string;
  zipCode: string;
  number: string;
  city: City;
  state: State;
}

export interface City {
  id: string;
  name: string;
}

export interface State {
  id: string;
  name: string;
}
