import Payment from "../../atom/payment";
import { Steps } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "@/interfaces/cart";
import Address from "../../atom/address";
import PurchaseConfirm from "../../atom/confirmPurschase";

const steps = [
  {
    title: "Pagamento",
    content: "Forma de pagamento",
  },
  {
    title: "Endereço",
    content: "Endereço de entrega",
  },
  {
    title: "Confirmação",
    content: "Confirmação de compra",
  },
];

const PaymentCardComponent: React.FC = () => {
  const { payment, address, confirmed }: Cart = useSelector(
    (state: any) => state.cart,
  );

  const [current, setCurrent] = useState(0);

  const handlerStepComponent = useCallback((current: number) => {
    switch (current) {
      case 0:
        return <Payment />;
      case 1:
        return <Address />;
      case 2:
        return <PurchaseConfirm />;
      default:
        return <Payment />;
    }
  }, []);

  const handleToggleStep = (current: number) => {
    if (current === 1 && !payment) {
      return;
    }

    if (current === 2 && !address) {
      return;
    }

    setCurrent(current);
  };

  const stateStep = (key: number) => {
    if (key === 0 && !payment) {
      return "process";
    }

    if (key === 1 && !address) {
      return "process";
    }

    if (key === 2 && !confirmed) {
      return "process";
    }
  };

  useEffect(() => {
    if (payment) {
      setCurrent(1);
    }
    if (address) {
      setCurrent(2);
    }
  }, [payment, address]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 md:p-10 h-fit mt-10">
      <Steps current={current}>
        {steps.map((item, key) => (
          <Steps.Step
            key={item.title}
            title={item.title}
            className="cursor-pointer"
            onClick={() => handleToggleStep(key)}
            status={stateStep(key)}
          />
        ))}
      </Steps>
      <div className="mt-5">{handlerStepComponent(current)}</div>
    </div>
  );
};

export default memo(PaymentCardComponent);
