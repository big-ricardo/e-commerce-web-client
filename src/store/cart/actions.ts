import Address from "@/interfaces/address";
import Cart from "@/interfaces/cart";
import Payment from "@/interfaces/payment";
import Product from "@/interfaces/product";
import * as actions from "./actionTypes";

export const addToCart = (product: Product) => ({
  type: actions.ADD_TO_CART,
  payload: {
    product,
  },
});

export const removeFromCart = (product: Product) => ({
  type: actions.REMOVE_FROM_CART,
  payload: {
    product,
  },
});

export const resetCart = () => ({
  type: actions.RESET_CART,
});

export const addPayment = (payment: Payment) => ({
  type: actions.ADD_PAYMENT,
  payload: {
    payment,
  },
});

export const addAddress = (address: Address) => ({
  type: actions.ADD_ADDRESS,
  payload: {
    address,
  },
});

export const confirmPurchase = (cart: Cart) => ({
  type: actions.CONFIRM_PURCHASE,
  payload: {
    cart,
  },
});

export const confirmPurchaseSuccess = () => ({
  type: actions.CONFIRM_PURCHASE_SUCCESS,
});

export const confirmPurchaseFailure = (error: any) => ({
  type: actions.CONFIRM_PURCHASE_FAILURE,
  payload: {
    error,
  },
});
