import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { USER_LOGIN, USER_CREATE, USER_GET_ADDRESS } from "./actionTypes";
import {
  loginSuccess,
  loginFailure,
  createSuccess,
  createFailure,
  getAddressSuccess,
  getAddressFailure,
} from "./actions";
import { api } from "../../services/api";
import { UserCreate, UserLogin } from "@/interfaces/user";
import { AxiosResponse } from "axios";

export function* loginUser(action: { payload: { user: UserLogin } }) {
  try {
    const response: AxiosResponse = yield call(api.post, "/login", {
      email: action.payload.user.email,
      senha: action.payload.user.password,
    });
    const { data } = response;
    const { token } = data;
    yield put(loginSuccess({ ...data.cliente, token }));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export function* createUser(action: { payload: { user: any } }) {
  action.payload.user.addresses.forEach((address: any) => {
    address["city"] = {
      ...address.city,
      state: {
        ...address.state,
      },
    };
    delete address.state;
  });
  return;
  try {
    const response: AxiosResponse = yield call(
      api.post,
      "/clientes",
      action.payload.user,
    );
    const { data } = response;
    yield put(createSuccess({ ...data }));
  } catch (error: any) {
    yield put(createFailure(error.message));
  }
}

export function* getAddress(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      api.get,
      `/clientes/enderecos/${action.payload.id}`,
    );
    const { data } = response;
    yield put(getAddressSuccess(data));
  } catch (error: any) {
    yield put(getAddressFailure(error.message));
  }
}

export function* watchLoginUser() {
  yield takeEvery<any>(USER_LOGIN, loginUser);
}

export function* watchCreateUser() {
  yield takeEvery<any>(USER_CREATE, createUser);
}

export function* watchGetAddress() {
  yield takeEvery<any>(USER_GET_ADDRESS, getAddress);
}

function* userSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchCreateUser),
    fork(watchGetAddress),
  ]);
}

export default userSaga;
