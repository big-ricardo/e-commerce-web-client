import Product from "./product";
import Payment from "./payment";
import Address from "./address";
import { requestStatus } from "./interfaces";

export default interface Cart {
  products: Product[];
  totalSales: number;
  totalItems: number;
  payment: Payment | null;
  address: Address | null;
  confirmed: boolean;
  status: {
    post: requestStatus;
  };
}
