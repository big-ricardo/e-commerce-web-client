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
  city: City;
}

export interface City {
  id: string;
  name: string;
  state: State;
}

export interface State {
  id: string;
  name: string;
}
