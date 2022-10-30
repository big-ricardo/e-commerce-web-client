import User from "@/interfaces/user";
import Address from "@/interfaces/address";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../store/cart/actions";
import Cart from "@/interfaces/cart";
import AddressItem from "./addressItem";

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
          <AddressItem key={key} address={address} />
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
