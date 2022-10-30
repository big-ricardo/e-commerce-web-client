import ProductsGrid from "../../components/molecule/productsGrid";
import CategoriesGrid from "../../components/molecule/categoriesGrid";
import { memo, useEffect } from "react";
import { getCategories } from "../../store/categories/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const DashboardComponent: React.FC = () => {
  const dispatch = useDispatch();

  const { data: categories, status: statusCategory } = useSelector(
    (state: any) => state.categories,
  );

  useEffect(() => {
    if (statusCategory.get.success) return;
    if (!statusCategory.get.loading) {
      dispatch(getCategories());
    }
  }, [statusCategory.get]);

  return (
    <>
      <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500">Categorias</h2>
        <CategoriesGrid categories={categories} />
      </div>
      <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500">Produtos</h2>
        <ProductsGrid products={[]} />
      </div>
    </>
  );
};

export default memo(DashboardComponent);
