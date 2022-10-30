import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import categoriesReducer from "./categories/reducer";
import productsReducer from "./products/reducer";

export interface rootState {
  user: ReturnType<typeof userReducer>;
  cart: ReturnType<typeof cartReducer>;
  categories: ReturnType<typeof categoriesReducer>;
  products: ReturnType<typeof productsReducer>;
}


const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  products: productsReducer,
});

export default rootReducer;
