import ProductsGrid from "../../components/molecule/productsGrid";
import CategoriesGrid from "../../components/molecule/categoriesGrid";
import { memo } from "react";

const DashboardComponent: React.FC = () => {
  return (
    <>
    <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500">Categorias</h2>
        <CategoriesGrid categories={[]} />
      </div>
      <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500">Produtos</h2>
        <ProductsGrid products={[]} />
      </div>
    </>
  );
};

export default memo(DashboardComponent);
