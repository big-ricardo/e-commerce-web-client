import { memo, useEffect } from "react";
import { rootState } from "@/store/reducers";
import ProductsGrid from "../../components/molecule/productsGrid";
import CategoriesGrid from "../../components/molecule/categoriesGrid";
import { getCategories } from "../../store/categories/actions";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/actions";

const DashboardComponent: React.FC = () => {
  const dispatch = useDispatch();

  const { data: categories, status: statusCategory } = useSelector(
    (state: rootState) => state.categories,
  );

  const { data: products, status: statusProduct } = useSelector(
    (state: rootState) => state.products,
  );

  useEffect(() => {
    if (statusCategory.get.success) return;
    if (!statusCategory.get.loading) {
      dispatch(getCategories());
    }
  }, [statusCategory.get]);

  useEffect(() => {
    if (statusProduct.get.success) return;
    if (!statusProduct.get.loading) {
      dispatch(getProducts({}));
    }
  }, [statusProduct.get]);

  return (
    <>
      <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500 mb-5">Categorias</h2>
        <CategoriesGrid
          categories={categories}
          loading={statusCategory.get.loading}
        />
      </div>
      <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500 mb-5">Produtos</h2>
        <ProductsGrid products={products} loading={statusProduct.get.loading} />
      </div>
    </>
  );
};

export default memo(DashboardComponent);
