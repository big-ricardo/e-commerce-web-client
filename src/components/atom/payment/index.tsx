import { addPayment } from "../../../store/cart/actions";
import { Form } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Payment from "@/interfaces/payment";

const PaymentComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const totalSales = useSelector((state: any) => state.cart.totalSales);

  const payment: Payment = useSelector((state: any) => state.cart.payment);

  const onFinish = (values: Payment) => {
    dispatch(addPayment(values));
  };

  useEffect(() => {
    if (payment) {
      form.setFieldsValue(payment);
    }
  }, [payment]);

  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-500">Pagamento</h2>
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
            rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
          >
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </Form.Item>
          <Form.Item
            label="CPF"
            name="cpf"
            rules={[{ required: true, message: "Por favor, insira seu CPF!" }]}
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
    </>
  );
};

export default memo(PaymentComponent);
