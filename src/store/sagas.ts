import { all } from "redux-saga/effects";
import categoriesSaga from "./categories/saga";

import userSaga from "./user/saga";

export default function* rootSaga() {
  yield all([userSaga(), categoriesSaga()]);
}
