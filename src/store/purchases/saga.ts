import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { getPurchasesFailure, getPurchasesSuccess } from "./actions";
import { GET_PURCHASES } from "./actionTypes";
import Purchase from "@/interfaces/purchases";

export function* getPurchases({ payload }: any) {
  const id: string = payload.id;
  try {
    const response: AxiosResponse = yield call(
      api.get,
      "/clientes/pedidos/" + id,
    );
    const data: Purchase[] = response.data;

    yield put(getPurchasesSuccess(data));
  } catch (error: any) {
    yield put(getPurchasesFailure(error.message));
  }
}
export function* watchgetPurschases() {
  yield takeEvery<any>(GET_PURCHASES, getPurchases);
}

function* categoriesSaga() {
  yield all([fork(watchgetPurschases)]);
}

export default categoriesSaga;
