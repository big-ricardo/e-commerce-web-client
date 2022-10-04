import Product from "@/interfaces/product";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

import ProductsGrid from "../../components/molecule/productsGrid";
import PurchaseCard from "../../components/molecule/purchaseCard";

const CartComponent: React.FC = () => {
  const productsInCart: Product[] = useSelector(
    (state: any) => state.cart.products,
  );

  const total = useSelector((state: any) => state.cart.totalItems);

  const productsUnique = useMemo(() => {
    const products = productsInCart.reduce((acc: any, product: Product) => {
      const productInAcc = acc.find((p: Product) => p.id === product.id);
      if (productInAcc) {
        productInAcc.qtd++;
      } else {
        acc.push({ ...product });
      }
      return acc;
    }, []);
    return products.sort((a: Product, b: Product) => a.price - b.price);
  }, [productsInCart]);

  return (
    <div className="bg-blue-100 rounded-xl m-auto mt-10 p-10">
      <div className="flex flex-wrap justify-between max-w-7xl">
        <h2 className="text-3xl font-bold text-indigo-500">
          Produtos no Carrinho
        </h2>
        <h3 className="text-2xl text-indigo-700 bg-white px-5 py-2 rounded-full">
          Total de items: {total}
        </h3>
      </div>
      <div className="flex md:mt-10 justify-evenly flex-wrap">
        <div className="max-w-full md:max-w-3xl">
          <ProductsGrid products={productsUnique} isConfirmRemoved />
        </div>
        {!!productsUnique.length && <PurchaseCard />}
      </div>
    </div>
  );
};

export default memo(CartComponent);
