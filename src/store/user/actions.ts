import User, { UserCreate, UserLogin } from "@/interfaces/user";
import * as actions from "./actionTypes";

export const login = (user: UserLogin) => ({
  type: actions.USER_LOGIN,
  payload: {
    user,
  },
});

export const loginSuccess = (user: User) => ({
  type: actions.USER_LOGIN_SUCCESS,
  payload: {
    user,
  },
});

export const loginFailure = (error: any) => ({
  type: actions.USER_LOGIN_FAILURE,
  payload: {
    error,
  },
});

export const logout = () => {
  localStorage.removeItem("applicationState");
  return {
    type: actions.USER_LOGOUT,
  };
}

export const create = (user: UserCreate) => ({
  type: actions.USER_CREATE,
  payload: {
    user,
  },
});

export const createSuccess = (user: any) => ({
  type: actions.USER_CREATE_SUCCESS,
  payload: {
    user,
  },
});

export const createFailure = (error: any) => ({
  type: actions.USER_CREATE_FAILURE,
  payload: {
    error,
  },
});

export const resetStatus = () => ({
  type: actions.USER_RESET_STATUS,
});
