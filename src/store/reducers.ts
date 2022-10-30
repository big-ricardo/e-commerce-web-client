import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import categoriesReducer from "./categories/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  categories: categoriesReducer,
});

export default rootReducer;
