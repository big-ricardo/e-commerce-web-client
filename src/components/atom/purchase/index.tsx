import ProductsGrid from "../../../components/molecule/productsGrid";
import Purchase from "@/interfaces/purchases";
import React, { memo } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  purchase: Purchase;
}

const PurchaseComponent: React.FC<Props> = ({ purchase }) => {
  return (
    <div
      key={purchase.id}
      className="w-full p-5 mb-5 border border-gray-200"
    >
      <div className="flex flex-col items-start justify-start p-4">
        <div className="flex flex-row items-start justify-start g-5">
          <h6 className="text-lg font-semibold text-indigo-500">
            Data do pedido:
          </h6>
          <h6 className="text-lg font-semibold text-gray-700">
            {purchase.date}
          </h6>
        </div>
        <div className="flex flex-row items-start justify-start g-5">
          <h6 className="text-lg font-semibold text-indigo-500">
            Valor total:
          </h6>
          <h6 className="text-lg font-semibold text-gray-700">
            {purchase.total}
          </h6>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start p-4">
        <h6 className="text-2xl font-semibold text-indigo-500 p-5 mb-5">Produtos:</h6>
        <div className="flex flex-col items-center justify-center">
          <ProductsGrid products={purchase.products} isPurchase />
        </div>
      </div>
    </div>
  );
};

export default memo(PurchaseComponent);
