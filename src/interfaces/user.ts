import Address, { AddressCreate } from "./address";

export default interface User {
    authorization: string;
    name: string;
    email: string;
    addresses: Address[];
}

export interface UserLogin {
    name: string;
    password: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
    addresses: AddressCreate[];
}