import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { USER_LOGIN, USER_CREATE } from "./actionTypes";
import {
  loginSuccess,
  loginFailure,
  createSuccess,
  createFailure,
} from "./actions";
import { api } from "../../services/api";
import { UserCreate, UserLogin } from "@/interfaces/user";
import { AxiosResponse } from "axios";

export function* loginUser(action: { payload: { user: UserLogin } }) {
  try {
    const response: AxiosResponse = yield call(
      api.post,
      "/login",
      {
        email: action.payload.user.email,
        senha: action.payload.user.password,
      }
    );
    const { data } = response;
    const { token } = data;
    yield put(loginSuccess({ ...data.cliente, token }));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export function* createUser(action: { payload: { user: UserCreate } }) {
  try {
    const response: AxiosResponse = yield call(
      api.post,
      "/user",
      action.payload.user,
    );
    const { data } = response;
    yield put(createSuccess({ ...data }));
  } catch (error: any) {
    yield put(createFailure(error.message));
  }
}

export function* watchLoginUser() {
  yield takeEvery<any>(USER_LOGIN, loginUser);
}

export function* watchCreateUser() {
  yield takeEvery<any>(USER_CREATE, createUser);
}

function* userSaga() {
  yield all([fork(watchLoginUser), fork(watchCreateUser)]);
}

export default userSaga;
