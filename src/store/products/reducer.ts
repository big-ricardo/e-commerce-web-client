import Product from "@/interfaces/product";
import { requestStatus } from "@/interfaces/interfaces";
import * as actions from "./actionsTypes";

export interface ProductsState {
  data: Product[];
  status: {
    get: requestStatus;
  };
}

const initialState: ProductsState = {
  data: [],
  status: {
    get: {
      loading: false,
      error: null,
      success: false,
    },
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_PRODUCTS:
      return {
        ...state,
        status: {
          ...state.status,
          get: {
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case actions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload.categories,
        status: {
          ...state.status,
          get: {
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case actions.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          get: {
            loading: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    default:
      return state;
  }
};
