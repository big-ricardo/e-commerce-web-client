export default interface Payment {
    type: string;
    name?: string;
    cpf?: string;
    cardNumber?: string;
    validity?: string;
    securityCode?: string;
}