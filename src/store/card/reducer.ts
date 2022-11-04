import Card from "@/interfaces/card";
import { requestStatus } from "@/interfaces/interfaces";
import * as actions from "./actionTypes";

interface initialStateProps {
  card: null | Card;
  status: {
    addCard: requestStatus;
    getCards: requestStatus;
  };
}

const initialState: initialStateProps = {
  card: null,
  status: {
    addCard: {
      loading: false,
      error: null,
      success: false,
    },
    getCards: {
      loading: false,
      error: null,
      success: false,
    },
  },
};

export default function cardReducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.ADD_CARD:
      return {
        ...state,
        status: {
          ...state.status,
          addCard: {
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case actions.ADD_CARD_SUCCESS:
      return {
        ...state,
        card: action.payload.card,
        status: {
          ...state.status,
          addCard: {
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case actions.ADD_CARD_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          addCard: {
            loading: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    case actions.GET_CARDS:
      return {
        ...state,
        status: {
          ...state.status,
          getCards: {
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    case actions.GET_CARDS_SUCCESS:
      return {
        ...state,
        card: action.payload.cards,
        status: {
          ...state.status,
          getCards: {
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    case actions.GET_CARDS_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          getCards: {
            loading: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    default:
      return state;
  }
}
