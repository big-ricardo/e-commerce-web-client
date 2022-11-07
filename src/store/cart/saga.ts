import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { confirmPurchaseSuccess, confirmPurchaseFailure } from "./actions";
import { CONFIRM_PURCHASE } from "./actionTypes";
import Cart from "@/interfaces/cart";

interface ConfirmPurchaseAction {
  type: typeof CONFIRM_PURCHASE;
  payload: {
    cart: Cart;
  };
}

export function* getCategories({ payload }: ConfirmPurchaseAction) {
  const data: any = {
    ...payload.cart,
    valorTotal: payload.cart.totalSales,
  };
  delete data.totalSales;
  try {
    const response: AxiosResponse = yield call(
      api.post,
      "/pedidos/finaliza-pedido",
      {
        ...data,
      },
    );
    const {} = response;
    yield put(confirmPurchaseSuccess());
  } catch (error: any) {
    yield put(confirmPurchaseFailure(error.message));
  }
}

export function* watchGetCategories() {
  yield takeEvery<any>(CONFIRM_PURCHASE, getCategories);
}

function* categoriesSaga() {
  yield all([fork(watchGetCategories)]);
}

export default categoriesSaga;
