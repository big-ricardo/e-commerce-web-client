import { addPayment } from "../../../../store/cart/actions";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Payment from "@/interfaces/payment";

const PixPayment = () => {
  const dispatch = useDispatch();
  const totalSales = useSelector((state: any) => state.cart.totalSales);

  const handleClick = (e:any) => {
    e.preventDefault();
    dispatch(addPayment({type: "pix"}));
  };

  return (
    <>
      <div className="p-2 flex flex-col gap-5 mt-5">
        <div className="flex justify-evenly flex-row mt-10">
          <h3 className="text-2xl text-indigo-700 bg-white px-5 py-2 rounded-full">
            {`Total: R$ ${parseFloat(totalSales).toFixed(2)}`}
          </h3>
          <button
            className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleClick}
          >
            Add pagamento
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(PixPayment);
