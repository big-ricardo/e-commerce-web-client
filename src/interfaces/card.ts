export default interface Card {
  name?: string;
  cpf?: string;
  cardNumber: string;
  validity: string;
  securityCode: string;
  client: {
    name: string;
    email: string;
    cpf?: string;
  };
}
