import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import {
  addCardFailure,
  addCardSuccess,
  getCardsFailure,
  getCardsSuccess,
} from "./actions";
import { ADD_CARD, GET_CARDS } from "./actionTypes";
import Card from "@/interfaces/card";

export function* addCard({ payload }: any) {
  const card: Card = payload.card;
  try {
    const response: AxiosResponse = yield call(api.post, "/cartoes", {
      card,
      clienteId: payload.id,
    });
    const { data } = response;
    yield put(addCardSuccess(data));
  } catch (error: any) {
    yield put(addCardFailure(error.message));
  }
}

export function* getCard({ payload }: any) {
  const id: string = payload.id;
  try {
    const response: AxiosResponse = yield call(api.get, `/cartoes/${id}`);
    const { data } = response;
    yield put(getCardsSuccess({ ...data, client: data.cliente }));
  } catch (error: any) {
    yield put(getCardsFailure(error.message));
  }
}

export function* watchAddCard() {
  yield takeEvery<any>(ADD_CARD, addCard);
}

export function* watchGetCard() {
  yield takeEvery<any>(GET_CARDS, getCard);
}

function* categoriesSaga() {
  yield all([fork(watchAddCard), fork(watchGetCard)]);
}

export default categoriesSaga;
