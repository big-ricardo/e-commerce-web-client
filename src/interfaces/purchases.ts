import Address from "./address";
import Payment from "./payment";
import Product from "./product";

export default interface Purchase {
  id: string;
  date: string;
  products: Product[];
  total: number;
  address: Address;
}

export interface CreatePurchase {
  products: Product[];
  payment: number;
  address: Address;
}
