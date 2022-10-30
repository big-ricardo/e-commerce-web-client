import Category from "@/interfaces/category";
import { requestStatus } from "@/interfaces/interfaces";
import * as actions from "./actionsTypes";

export interface CategoryState {
  data: Category[];
  status: {
    get: requestStatus;
  };
}

const initialState: CategoryState = {
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
    case actions.GET_CATEGORIES:
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
    case actions.GET_CATEGORIES_SUCCESS:
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
    case actions.GET_CATEGORIES_FAILURE:
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
