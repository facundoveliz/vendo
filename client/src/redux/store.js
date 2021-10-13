import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";

const reducers = combineReducers({ cart: cartReducer });

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(reducers, INITIAL_STATE, applyMiddleware(thunk));

export default store;
