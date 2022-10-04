import { memo } from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { Form, Input, Tooltip } from "antd";

const AddressInputComponent = () => {
  return (
    <Form.List
      name="addresses"
      initialValue={[{}]}
      rules={[
        {
          validator: async (_, addresses) => {
            if (!addresses || addresses.length < 1) {
              return Promise.reject(
                new Error("Preencha no minimo um endereço!"),
              );
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          <Form.Item className="sticky top-0 z-10 bg-blue-100">
            <div className="flex justify-between items-center">
              <p>{`Endereços (${fields.length})`}</p>
              <Tooltip placement="topLeft" title={"Add endereço"}>
                <button
                  type="button"
                  className="text-blue-900"
                  onClick={() => add()}
                >
                  <PlusCircleOutlined />
                </button>
              </Tooltip>
            </div>
          </Form.Item>
          {fields.map(({ name, ...field }, key) => (
            <div key={key}>
              {key > 0 && (
                <Form.Item className="sticky top-0 z-10 bg-blue-100">
                  <div className="flex justify-between items-center">
                    <p>{`Endereço ${key + 1}`}</p>
                    {fields.length - 1 === key && !!key && (
                      <Tooltip placement="topLeft" title={"Remover endereço"}>
                        <button
                          type="button"
                          className="text-blue-900"
                          onClick={() => remove(name)}
                        >
                          <MinusCircleOutlined />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </Form.Item>
              )}
              <Form.Item required={false}>
                <Form.Item
                  {...field}
                  name={[name, "street"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Preencha a rua e o numero do endereço.",
                    },
                  ]}
                >
                  <Input placeholder="Rua" size="large" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[name, "neighborhood"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Preencha seu bairro.",
                    },
                  ]}
                >
                  <Input placeholder="Bairro" size="large" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[name, "complement"]}
                  rules={[
                    {
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Complemento" size="large" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[name, "city"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Preencha sua cidade.",
                    },
                  ]}
                >
                  <Input placeholder="Cidade" size="large" />
                </Form.Item>
              </Form.Item>
            </div>
          ))}
          {!!errors.length && (
            <Form.Item>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          )}
        </>
      )}
    </Form.List>
  );
};

export default memo(AddressInputComponent);
