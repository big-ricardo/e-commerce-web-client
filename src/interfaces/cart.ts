import Product from "./product";
import Payment from "./payment";
import Address from "./address";

export default interface Cart {
    products: Product[];
    totalSales: number;
    totalItems: number;
    payment: Payment | null,
    address: Address | null,
    confirmed: boolean,
  }