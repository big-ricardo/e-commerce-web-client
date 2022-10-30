import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    const { cart, user } = getState();
    localStorage.setItem("applicationState", JSON.stringify({ cart, user }));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState") || "");
  }
};

const store = configureStore({
  reducer,
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(localStorageMiddleware);
  },
});
sagaMiddleware.run(rootSaga);

export { store };
