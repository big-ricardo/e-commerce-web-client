import Address from "@/interfaces/address";
import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../store/cart/actions";
import Cart from "@/interfaces/cart";
import AddressItem from "./addressItem";
import { rootState } from "@/store/reducers";
import { getAddress } from "../../../store/user/actions";

const AddressComponent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data,
    status: { get_address: status },
  } = useSelector((state: rootState) => state.user);
  const id = data.id;
  const addresses = data.address;
  const { address }: Cart = useSelector((state: any) => state.cart);
  const [selectAddress, setAddress] = useState<Address | null>(
    addresses?.find((a: Address) => a?.id === address?.id) || null,
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

  useEffect(() => {
    if (status.loading) return;
    if (status.success) return;

    dispatch(getAddress(id));
  }, [status, id]);

  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-500">
        Endereço de entrega
      </h2>
      <Radio.Group
        onChange={onChange}
        value={selectAddress}
        className="w-full mt-5"
        defaultValue={
          addresses?.find((a: Address) => a.id === address?.id) || null
        }
      >
        {addresses?.map((address: Address, key: number) => (
          <AddressItem key={key} index={key} address={address} />
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
