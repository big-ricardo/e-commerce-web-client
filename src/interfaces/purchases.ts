import Product from "./product";

export default interface Purchase {
  id: string;
  date: string;
  products: Product[];
}
