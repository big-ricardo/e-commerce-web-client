import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { getProductsSuccess, getProductsFailure, GetProducts } from "./actions";
import { GET_PRODUCTS } from "./actionsTypes";

interface payloadType {
  type: string;
  payload: GetProducts;
}

export function* getProducts({
  payload: { productId, categoryIds },
}: payloadType) {
  try {
    let params = "";
    if (categoryIds) {
      params = `/categoria/${categoryIds}`;
    }
    const response: AxiosResponse = yield call(api.get, `/produtos${params}`);
    const { data } = response;
    yield put(getProductsSuccess(data));
  } catch (error: any) {
    yield put(getProductsFailure(error.message));
  }
}

export function* watchGetProducts() {
  yield takeEvery<any>(GET_PRODUCTS, getProducts);
}

function* productSaga() {
  yield all([fork(watchGetProducts)]);
}

export default productSaga;
