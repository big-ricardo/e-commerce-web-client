import Card from "./card";

export default interface Payment {
  type: string;
  card?: Card;
}
