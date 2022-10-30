import Product from "@/interfaces/product";
import { addToCart, removeFromCart } from "../../../store/cart/actions";
import { Badge, InputNumber, Tooltip, Popconfirm, Skeleton } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { memo, useEffect, useMemo, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Tag from "../tags";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  isConfirmRemoved?: boolean;
}

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isConfirmRemoved = false,
}) => {
  const dispatch = useDispatch();

  const productsInCart = useSelector((state: any) => state.cart.products);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isProductInCart = useMemo(() => {
    return productsInCart.some((p: Product) => p.id === product.id);
  }, [productsInCart, product]);

  const qtdProductInCart = useMemo(() => {
    const productInCart = productsInCart.filter(
      (p: Product) => p.id === product.id,
    );
    return productInCart ? productInCart.length : 1;
  }, [productsInCart, product]);

  const [qtd, setQtd] = useState(qtdProductInCart);

  const addItem = () => {
    dispatch(addToCart(product));
  };

  const removeItem = () => {
    dispatch(removeFromCart(product));
  };

  const onCancel = () => {
    setOpenConfirm(false);
  };

  const handleUpdateQtd = (value: number | null) => {
    if (value === null) return;

    if (value > qtdProductInCart) {
      for (let i = qtdProductInCart; i < value; i++) {
        addItem();
      }
    } else {
      if (qtdProductInCart === 1 && isConfirmRemoved) {
        setOpenConfirm(true);
        return;
      }
      for (let i = qtdProductInCart; i > value; i--) {
        removeItem();
      }
    }
  };

  useEffect(() => {
    setQtd(qtdProductInCart);
  }, [qtdProductInCart]);

  return (
    <div
      key={product.id}
      className="bg-white shadow-md rounded-lg max-w-xs hover:translate-x-2"
    >
      <Badge.Ribbon
        text="No carrinho"
        style={{ display: isProductInCart ? "" : "none" }}
        color="green"
      >
        <div>
          <img
            className="object-cover w-full h-full rounded-t-lg p-8"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="px-5 pb-5">
          <a href="#">
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
              {product.name}
            </h3>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            {product.category?.map((tag, key) => (
              <Tag key={key} index={key} tag={tag} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">{`R$${product.price}`}</span>
            {isProductInCart ? (
              <div>
                <Popconfirm
                  title="Deseja remover o produto do carrinho?"
                  onConfirm={removeItem}
                  open={openConfirm}
                  onCancel={onCancel}
                  okType="danger"
                >
                  <InputNumber
                    min={0}
                    defaultValue={qtdProductInCart}
                    onChange={handleUpdateQtd}
                    inputMode="numeric"
                    value={qtd}
                  />
                </Popconfirm>
              </div>
            ) : (
              <Tooltip title="Adicionar ao carrinho">
                <button
                  onClick={addItem}
                  className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-2.5 text-center"
                >
                  <ShoppingCartOutlined className="text-white text-2xl" />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default memo(ProductCard);

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg max-w-xs hover:translate-x-2 w-96 max-w-xs">
      <div className="w-full h-72">
        <Skeleton.Image
          className="object-cover rounded-t-lg p-8 w-full h-full"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-center mt-2.5 mb-5">
          <Skeleton.Input className="mr-2" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton.Button className="text-3xl font-bold text-gray-900" />
          <Skeleton.Button className="text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-2.5 text-center" />
        </div>
      </div>
    </div>
  );
};
