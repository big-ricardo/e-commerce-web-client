import { memo, useEffect, useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { Form, Input, Select, Tooltip } from "antd";
import { api } from "../../../services/api";
import { City, State } from "@/interfaces/address";

interface AddressInputProps {
  name: number;
  field: any;
  index: number;
  remove: any;
  fieldsLength: number;
  states: State[] | null;
}

const AddressInputComponent = ({
  name,
  field,
  index,
  remove,
  states,
  fieldsLength,
}: AddressInputProps) => {
  const [citys, setCitys] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | undefined | null>(
    null,
  );
  const [selectedState, setSelectedState] = useState<State | null>();

  const form = Form.useForm();

  const getCities = async () => {
    const state = selectedState?.id;

    if (state) {
      await api.get(`/cidades/estado/${state}`).then(res => setCitys(res.data));
    }
  };

  const handleSelectState = (value: string) => {
    const state = states?.find(state => state.id === value);
    setSelectedState(state);
  };

  const handleSelectCity = (value: string) => {
    const city = citys?.find(city => city.id === value);
    setSelectedCity(city);
  };

  useEffect(() => {
    getCities();
  }, [selectedState]);

  return (
    <div>
      {index > 0 && (
        <Form.Item className="sticky top-0 z-10 bg-blue-100">
          <div className="flex justify-between items-center">
            <p>{`Endereço ${index + 1}`}</p>
            {fieldsLength - 1 === index && !!index && (
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
          <Input placeholder="Rua" size="large" data-testid="input-street" />
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
          <Input
            placeholder="Bairro"
            size="large"
            data-testid="input-neighborhood"
          />
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
          <Input
            placeholder="Complemento"
            size="large"
            data-testid="input-complement"
          />
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
          <Input placeholder="Numero" size="large" data-testid="input-number" />
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
          <Input placeholder="CEP" size="large" data-testid="input-zipCode" />
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
            value={selectedState?.id}
            data-testid="select-state"
          >
            {states?.map(state => (
              <Select.Option value={state.id} key={state.id + Date.now()}>
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
          <Select
            placeholder="Cidade"
            size="large"
            value={selectedCity?.id}
            onChange={handleSelectCity}
            data-testid="select-city"
          >
            {citys.map(city => (
              <Select.Option value={city.id} key={city.id + Date.now()}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>
    </div>
  );
};

export default memo(AddressInputComponent);
