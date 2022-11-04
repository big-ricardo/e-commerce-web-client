import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { rootState } from "@/store/reducers";
import CartAdd from "./sub/cartAdd";
import Pix from "./sub/pix";
import { getCards } from "../../../store/card/actions";

const PaymentComponent = () => {
  const [type, setType] = useState("creditCard");
  const dispatch = useDispatch();

  const card = useSelector((state: rootState) => state.card);
  const user = useSelector((state: rootState) => state.user.data);

  useEffect(() => {
    if (card.card) return;
    if (card.status.getCards.loading) return;

    dispatch(getCards(user.id));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-500">Forma de Pagamento</h2>
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex flex-row gap-5">
          <button
            className={`${
              type === "creditCard" ? "bg-indigo-500 text-white" : ""
            } w-1/2 p-2 rounded-lg hover:bg-indigo-300`}
            onClick={() => setType("creditCard")}
          >
            Cartão de Crédito
          </button>
          <button
            className={`${
              type === "pix" ? "bg-indigo-500 text-white" : ""
            } w-1/2 p-2 rounded-lg hover:bg-indigo-300`}
            onClick={() => setType("pix")}
          >
            Pix
          </button>
        </div>
        {type === "creditCard" && <CartAdd />}
        {type === "pix" && <Pix />}
      </div>
    </>
  );
};

export default memo(PaymentComponent);
