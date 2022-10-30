import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { getCategoriesFailure, getCategoriesSuccess } from "./actions";
import { GET_CATEGORIES } from "./actionsTypes";

export function* getCategories() {
  try {
    const response: AxiosResponse = yield call(api.get, "/categories");
    const { data } = response;
    yield put(getCategoriesSuccess(data));
  } catch (error: any) {
    yield put(getCategoriesFailure(error.message));
  }
}

export function* watchGetCategories() {
  yield takeEvery<any>(GET_CATEGORIES, getCategories);
}

function* categoriesSaga() {
  yield all([fork(watchGetCategories)]);
}

export default categoriesSaga;
