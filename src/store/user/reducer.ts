import { requestStatus } from "@/interfaces/interfaces";
import User from "@/interfaces/user";
import * as actions from "./actionTypes";

export interface UserState {
  data: User | null;
  status: {
    login: requestStatus;
    create: requestStatus;
    get_address: requestStatus;
  };
}

const initialStateStatus = {
  loading: false,
  success: false,
  error: false,
};

const initialState: UserState = {
  data: null,
  status: {
    login: { ...initialStateStatus },
    create: { ...initialStateStatus },
    get_address: { ...initialStateStatus },
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        status: {
          ...state.status,
          login: {
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload.user,
        status: {
          ...state.status,
          login: {
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          login: {
            loading: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    case actions.USER_LOGOUT:
      return {
        ...initialState,
      };
    case actions.USER_CREATE:
      return {
        ...state,
        status: {
          ...state.status,
          create: {
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case actions.USER_CREATE_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          create: {
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case actions.USER_CREATE_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          create: {
            loading: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    case actions.USER_RESET_STATUS:
      return {
        ...state,
        status: {
          create: { ...initialStateStatus },
          login: { ...initialStateStatus },
          get_address: { ...initialStateStatus },
        },
      };
    case actions.USER_GET_ADDRESS:
      return {
        ...state,
        state: {
          ...state.status,
          get_address: {
            loading: true,
          },
        },
      };
    case actions.USER_GET_ADDRESS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          address: action.payload.address,
        },
        status: {
          ...state.status,
          get_address: {
            error: null,
            loading: false,
            success: true,
          },
        },
      };
    case actions.USER_GET_ADDRESS_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          get_address: {
            error: action.payload.error,
            loading: false,
            success: false,
          },
        },
      };
    default:
      return state;
  }
};
