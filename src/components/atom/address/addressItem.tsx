import Address from "@/interfaces/address";
import { Radio } from "antd";
import React, { HTMLAttributes, memo, useCallback } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  address: Address;
  index: number;
}

const AddressItem: React.FC<Props> = ({ address, index }) => {
  const Item = useCallback(
    ({ label, value }: { label: string; value: string }) => {
      return (
        <div className="flex gap-5 justify-start items-center">
          <h5 className="text-base text-indigo-700">{label}:</h5>
          <h6 className="text-lg break-words">{value}</h6>
        </div>
      );
    },
    [address],
  );

  return (
    <div
      key={address.id}
      className="flex items-center border-2 rounded-md border-indigo-100 p-5 mb-5"
    >
      <Radio value={address}>
        <div>
          <h2 className="text-base font-semibold text-indigo-700">
            {`Endereço ${index + 1}`}
          </h2>
        </div>
        <div className="flex flex-col mt-3">
          <Item label="Rua" value={address.street} />
          <Item label="Bairro" value={address.neighborhood} />
          <Item label="Cidade" value={address.city} />
          <Item label="Complemento" value={address.complement} />
        </div>
      </Radio>
    </div>
  );
};

export default memo(AddressItem);
