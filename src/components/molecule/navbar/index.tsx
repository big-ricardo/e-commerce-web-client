import Logo from "../../atom/logo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import User from "@/interfaces/user";
import { logout } from "../../../store/user/actions";
import { memo } from "react";
import { resetCart } from "../../../store/cart/actions";
import NavbarCart from "../../../components/atom/cart/navbarCart";
import { Popconfirm } from "antd";

const NavBarComponent = () => {
  const dispatch = useDispatch();

  const user: User = useSelector((state: any) => state.user.data);

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
        <div className="flex md:order-2 justify-center items-center gap-9 p-3">
          <Link
            to="/my-purchases"
            className="text-gray-600 hover:text-gray-900 text-md md:text-lg font-semibold whitespace-nowrap"
          >
            Minhas compras
          </Link>
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
          <NavbarCart />
        </div>
      </div>
    </nav>
  );
};

export default memo(NavBarComponent);
