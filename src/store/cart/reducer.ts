import Cart from "@/interfaces/cart";
import { requestStatus } from "@/interfaces/interfaces";
import * as actions from "./actionTypes";

interface CartState extends Cart {
  status: {
    post: requestStatus;
  };
}

const initialState: CartState = {
  products: [],
  totalSales: 0,
  totalItems: 0,
  payment: null,
  address: null,
  confirmed: false,
  status: {
    post: {
      loading: false,
      error: null,
      success: false,
    },
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.ADD_TO_CART: {
      const product = action.payload.product;
      const products = [...state.products, product];
      const totalSales = state.totalSales + product.price;
      const totalItems = state.totalItems + 1;
      return {
        ...state,
        products,
        totalSales,
        totalItems,
      };
    }
    case actions.REMOVE_FROM_CART: {
      const product = action.payload.product;
      const index = state.products.findIndex(p => p.id === product.id);
      const products = [...state.products];
      products.splice(index, 1);
      const totalSales = state.totalSales - product.price;
      const totalItems = state.totalItems - 1;
      if (products.length === 0) {
        return initialState;
      }
      return {
        ...state,
        products,
        totalSales,
        totalItems,
      };
    }
    case actions.RESET_CART: {
      return initialState;
    }
    case actions.ADD_PAYMENT: {
      const payment = action.payload.payment;
      return {
        ...state,
        payment,
      };
    }
    case actions.ADD_ADDRESS: {
      const address = action.payload.address;
      return {
        ...state,
        address,
      };
    }
    case actions.CONFIRM_PURCHASE: {
      return {
        ...state,
        confirmed: true,
        status: {
          post: {
            loading: true,
            error: null,
            success: false,
          },
        },
      };
    }
    case actions.CONFIRM_PURCHASE_SUCCESS: {
      return {
        ...state,
        status: {
          post: {
            loading: false,
            error: null,
            success: true,
          },
        },
      };
    }
    case actions.CONFIRM_PURCHASE_FAILURE: {
      const error = action.payload.error;
      return {
        ...state,
        status: {
          post: {
            loading: false,
            error,
            success: false,
          },
        },
      };
    }
    default:
      return state;
  }
};
