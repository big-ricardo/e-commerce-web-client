import { memo, useEffect } from "react";
import { rootState } from "@/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import { getPurchases } from "../../store/purchases/actions";
import PurchaseComponent from "../../components/atom/purchase";
import Purchase from "@/interfaces/purchases";
const DashboardComponent: React.FC = () => {
  const dispatch = useDispatch();

  const purchases = useSelector((state: rootState) => state.purchases);
  const user = useSelector((state: rootState) => state.user.data);

  useEffect(() => {
    if (purchases.status.success) return;
    if (purchases.status.loading) return;
    if (purchases.status.error) {
      toastr.error("Error em obter compras");
      setTimeout(() => {
        dispatch(getPurchases(user.id));
      }, 5000);
    } else {
      dispatch(getPurchases(user.id));
    }
  }, [purchases.status]);

  return (
    <div className="bg-blue-100 rounded-xl m-auto mt-10 p-2 md:p-10 w-11/12 2xl:w-3/4">
      {purchases.purchases.map((purchase: Purchase) => (
        <PurchaseComponent purchase={purchase} />
      ))}
    </div>
  );
};

export default memo(DashboardComponent);
