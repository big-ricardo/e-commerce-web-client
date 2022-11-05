import { memo, useEffect, useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { Form, Input, Select, Tooltip } from "antd";
import { api } from "../../../services/api";
import { City, State } from "@/interfaces/address";

const AddressInputComponent = () => {
  const [citys, setCitys] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<State>();

  const getStates = async () => {
    await api.get("/estados").then(res => setStates(res.data));
  };

  const getCities = async () => {
    const state = selectedState?.id;

    if (state) {
      await api.get(`/cidades/estado/${state}`).then(res => setCitys(res.data));
    }
  };

  const handleSelectState = (value: string) => {
    const state = states.find(state => state.id === value);

    setSelectedState(state);
  };

  useEffect(() => {
    if (!states.length) getStates();
  }, []);

  useEffect(() => {
    getCities();
  }, [selectedState]);

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
                  name={[name, "number"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,

                      message: "Preencha o numero do endereço.",
                    },
                  ]}
                >
                  <Input placeholder="Numero" size="large" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[name, "zipCode"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Preencha seu CEP.",
                    },
                  ]}
                >
                  <Input placeholder="CEP" size="large" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[name, "state"]}
                  rules={[
                    {
                      required: true,
                      message: "Preencha seu estado.",
                    },
                  ]}
                >
                  <Select
                    placeholder="Estado"
                    size="large"
                    onChange={handleSelectState}
                  >
                    {states.map(state => (
                      <Select.Option key={state.id} value={state.id}>
                        {state.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[name, "city"]}
                  dependencies={[name, "state"]}
                  rules={[
                    {
                      required: true,
                      message: "Preencha sua cidade.",
                    },
                  ]}
                >
                  <Select placeholder="Cidade" size="large">
                    {citys.map(city => (
                      <Select.Option key={city.id} value={city.id}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
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
