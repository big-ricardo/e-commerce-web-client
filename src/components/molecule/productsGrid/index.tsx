import ProductCard from "../../atom/product";
import Product from "@/interfaces/product";
import { memo } from "react";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  isConfirmRemoved?: boolean;
}

const ProductsGrid: React.FC<ProductCardProps> = ({
  products,
  isConfirmRemoved,
}) => {
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-2xl font-bold text-indigo-500">
          Nenhum produto no encontrado
        </h2>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-evenly xl:p-10 md-3 flex-wrap gap-5`}
    >
      {products.map(product => (
        <ProductCard
          product={product}
          key={product.id}
          isConfirmRemoved={isConfirmRemoved}
        />
      ))}
    </div>
  );
};

export default memo(ProductsGrid);
