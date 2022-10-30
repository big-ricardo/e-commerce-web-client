import ProductCard, { ProductCardSkeleton } from "../../atom/product";
import Product from "@/interfaces/product";
import { memo } from "react";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  isConfirmRemoved?: boolean;
  loading?: boolean;
}

const ProductsGrid: React.FC<ProductCardProps> = ({
  products,
  isConfirmRemoved,
  loading,
}) => {
  return (
    <div
      className={`flex items-center justify-evenly xl:p-10 md-3 flex-wrap gap-5`}
    >
      {!products.length && (
        <>
          {loading ? (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-indigo-500">
                Nenhum produto encontrado
              </h2>
            </div>
          )}
        </>
      )}

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
