import User from "@/interfaces/user";
import Address from "@/interfaces/address";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../store/cart/actions";
import Cart from "@/interfaces/cart";

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-5 justify-start items-center">
      <h5 className="text-base text-indigo-700">{label}:</h5>
      <h6 className="text-lg break-words">{value}</h6>
    </div>
  );
};

const AddressComponent: React.FC = () => {
  const dispatch = useDispatch();

  const { addresses }: User = useSelector((state: any) => state.user.data);
  const { address }: Cart = useSelector((state: any) => state.cart);

  const [selectAddress, setAddress] = useState<Address | null>(
    addresses.find(a => a.id === address?.id) || null,
  );

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setAddress(value);
  };

  const handleAddAddress = () => {
    if (selectAddress) {
      dispatch(addAddress(selectAddress));
    }
  };

  const disabledButton = useMemo(() => {
    if (address && selectAddress) {
      return address.id === selectAddress.id;
    }
    return false;
  }, [address, selectAddress]);

  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-500">
        Endereço de entrega
      </h2>
      <Radio.Group
        onChange={onChange}
        value={selectAddress}
        className="w-full mt-5"
        defaultValue={addresses.find(a => a.id === address?.id) || null}
      >
        {addresses?.map((address: Address, key) => (
          <div
            key={address.id}
            className="flex items-center border-2 rounded-md border-indigo-100 p-5 mb-5"
          >
            <Radio value={address}>
              <div>
                <h2 className="text-base font-semibold text-indigo-700">
                  {`Endereço ${key + 1}`}
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
        ))}
      </Radio.Group>

      <div className="flex justify-end">
        <button
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          onClick={handleAddAddress}
          disabled={disabledButton}
        >
          Selecionar endereço
        </button>
      </div>
    </>
  );
};

export default memo(AddressComponent);
