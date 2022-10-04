export default interface Address {
    id?: number;
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
}

export interface AddressCreate {
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
}