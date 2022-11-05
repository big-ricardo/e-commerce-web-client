import Purchase from "@/interfaces/purchases";
import * as actions from "./actionTypes";

export const getPurchases = (id: string) => ({
  type: actions.GET_PURCHASES,
  payload: {
    id,
  },
});

export const getPurchasesSuccess = (purchases: Purchase[]) => ({
  type: actions.GET_PURCHASES_SUCCESS,
  payload: {
    purchases,
  },
});

export const getPurchasesFailure = (error: string) => ({
  type: actions.GET_PURCHASES_FAILURE,
  payload: {
    error,
  },
});
