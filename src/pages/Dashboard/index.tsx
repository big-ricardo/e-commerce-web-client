import ProductsGrid from "../../components/molecule/productsGrid";
import CategoriesGrid from "../../components/molecule/categoriesGrid";
import { memo } from "react";

const products = [
  {
    id: "1",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    price: 599,
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
    category: ["Tênis"],
  },
  {
    id: "2",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    price: 599,
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
    category: ["Tênis"],
  },
  {
    id: "3",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    price: 599,
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
    category: ["Tênis"],
  },
  {
    id: "4",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    price: 599,
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
    category: ["Tênis"],
  },
  {
    id: "5",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    price: 599,
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
    category: ["Tênis"],
  },
  {
    id: "6",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    price: 599,
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
    category: ["Tênis"],
  },
];

const categories = [
  {
    id: "1",
    name: "Têniaaa aaaaaaaaaaaaaaaas",
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
  },
  {
    id: "2",
    name: "Tênis",
    image:
      "https://static.zattini.com.br/produtos/tenis-adidas-breaknet-masculino/28/NQQ-4378-028/NQQ-4378-028_zoom1.jpg?ts=1661862761",
  },
];

const DashboardComponent: React.FC = () => {
  return (
    <>
    <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500">Categorias</h2>
        <CategoriesGrid categories={categories} />
      </div>
      <div className="bg-blue-100 rounded m-auto max-w-screen-xl mt-10 p-10">
        <h2 className="text-3xl font-bold text-indigo-500">Produtos</h2>
        <ProductsGrid products={products} />
      </div>
    </>
  );
};

export default memo(DashboardComponent);
