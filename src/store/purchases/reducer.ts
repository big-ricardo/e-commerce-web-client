import Purchase from "@/interfaces/purchases";
import { requestStatus } from "@/interfaces/interfaces";
import * as actions from "./actionTypes";

interface initialStateProps {
  purchases: Purchase[];
  status: requestStatus;
}

const initialState: initialStateProps = {
  purchases: [],
  status: {
    loading: false,
    error: false,
    success: false,
  },
};

export default function purchasesReducer(
  state = initialState,
  action: any,
): initialStateProps {
  switch (action.type) {
    case actions.GET_PURCHASES:
      return {
        ...state,
        status: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case actions.GET_PURCHASES_SUCCESS:
      return {
        ...state,
        purchases: action.payload.purchases,
        status: {
          loading: false,
          error: false,
          success: true,
        },
      };
    case actions.GET_PURCHASES_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          error: action.payload.error,
          success: false,
        },
      };
    default:
      return state;
  }
}
