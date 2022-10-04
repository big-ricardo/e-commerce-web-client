import Logo from "../../atom/logo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import User from "@/interfaces/user";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Popconfirm } from "antd";
import Cart from "@/interfaces/cart";
import { logout } from "../../../store/user/actions";
import { memo } from "react";
import { resetCart } from "../../../store/cart/actions";

const NavBarComponent = () => {
  const dispatch = useDispatch();

  const user: User = useSelector((state: any) => state.user.data);
  const cart: Cart = useSelector((state: any) => state.cart);

  const handleLogout = () => {
    dispatch(resetCart());
    dispatch(logout());
  };

  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 sticky shadow w-full z-20 top-0 border-b border-gray-200">
      <div className="container flex justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <Logo />
          <span className="self-center text-indigo-600 hover:text-indigo-900 text-md md:text-xl font-semibold whitespace-nowrap">
            E-commerce
          </span>
        </Link>
        <div className="flex md:order-2 justify-center items-center gap-3 p-3">
          <Popconfirm
            title="Deseja realmente sair?"
            onConfirm={handleLogout}
            okText="Sim"
            okType="danger"
            cancelText="Não"
            className="text-black cursor-pointer"
            placement="bottomRight"
          >
            <p className="hidden md:inline">Olá, {user.name}</p>
          </Popconfirm>
          <div className="hover:bg-blue-200 rounded-full">
            <Link to="/cart">
              <Badge
                count={cart.totalItems}
                showZero
                title="Carrinho de compras"
              >
                <ShoppingCartOutlined className="text-indigo-500 text-2xl" />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(NavBarComponent);
