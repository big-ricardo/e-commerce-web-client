import Address, { AddressCreate } from "./address";

export default interface User {
    token: string;
    name: string;
    email: string;
    addresses: Address[];
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
    addresses: AddressCreate[];
}