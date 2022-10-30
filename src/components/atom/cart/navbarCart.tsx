import { Badge } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const NavbarCart: React.FC = () => {
  const totalItems: number = useSelector((state: any) => state.cart.totalItems);
  return (
    <div className="hover:bg-blue-200 rounded-full">
      <Link to="/cart">
        <Badge count={totalItems} showZero title="Carrinho de compras">
          <ShoppingCartOutlined className="text-indigo-500 text-2xl" />
        </Badge>
      </Link>
    </div>
  );
};

export default NavbarCart;
