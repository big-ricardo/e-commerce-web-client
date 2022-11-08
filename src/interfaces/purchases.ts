import Address from "./address";
import Payment from "./payment";
import Product from "./product";

export default interface Purchase {
  id: string;
  date: string;
  products: Product[];
  totalPrice: number;
  address: Address;
  payment: number;
}

export interface CreatePurchase {
  products: Product[];
  payment: number;
  address: Address;
}
