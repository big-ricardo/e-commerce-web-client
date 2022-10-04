import { combineReducers } from "@reduxjs/toolkit";

import userReducer from './user/reducer';
import cartReducer from './cart/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

export default rootReducer;