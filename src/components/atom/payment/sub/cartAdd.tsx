import { addPayment } from "../../../../store/cart/actions";
import { Form } from "antd";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Payment from "@/interfaces/payment";
import Card from "@/interfaces/card";
import { rootState } from "@/store/reducers";

const PaymentComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const totalSales = useSelector((state: rootState) => state.cart.totalSales);
  const payment: Payment = useSelector(
    (state: rootState) => state.cart.payment,
  );
  const card: Card = useSelector((state: rootState) => state.card.card);

  const onFinish = (values: Card) => {
    const data = {
      ...values,
      client: {
        name: values.name || card.client.name,
        cpf: values.cpf || card.client.cpf,
        email: '',
      },
    };
    dispatch(
      addPayment({
        card: data,
        type: "creditCard",
      }),
    );
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    onFinish({ ...card });
  };

  useEffect(() => {
    if (payment) {
      form.setFieldsValue(payment);
    }
  }, [payment]);

  return (
    <>
      {card ? (
        <div className="p-2 flex flex-col gap-5">
          <div className="flex flex-row gap-5 border p-5">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <h3 className="text-lg text-indigo-500">Número do Cartão:</h3>
                <h3 className="text-xl font-bold text-indigo-500">
                  {card.cardNumber}
                </h3>
              </div>
              <div className="flex gap-5">
                <h3 className="text-lg text-indigo-500">Validade:</h3>
                <h3 className="text-xl font-bold text-indigo-500">
                  {card.validity}
                </h3>
              </div>
              <div className="flex gap-5">
                <h3 className="text-lg text-indigo-500">nome:</h3>
                <h3 className="text-xl font-bold text-indigo-500">
                  {card.client.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly flex-col md:flex-row mt-10">
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
      ) : (
        <div className="p-2 flex flex-col gap-5 mt-5">
          <Form
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
            form={form}
          >
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                { required: true, message: "Por favor, insira seu nome!" },
              ]}
            >
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </Form.Item>
            <Form.Item
              label="CPF"
              name="cpf"
              rules={[
                { required: true, message: "Por favor, insira seu CPF!" },
              ]}
            >
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </Form.Item>
            <Form.Item
              label="Número do Cartão"
              name="cardNumber"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o número do cartão!",
                },
              ]}
            >
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </Form.Item>
            <Form.Item
              label="Data de Validade"
              name="validity"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a data de validade!",
                },
              ]}
            >
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </Form.Item>
            <Form.Item
              label="Código de Segurança"
              name="securityCode"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o código de segurança!",
                },
              ]}
            >
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </Form.Item>
            <div className="flex justify-evenly flex-col md:flex-row mt-10">
              <h3 className="text-2xl text-indigo-700 bg-white px-5 py-2 rounded-full">
                {`Total: R$ ${parseFloat(totalSales).toFixed(2)}`}
              </h3>
              <button className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                Add pagamento
              </button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default memo(PaymentComponent);
