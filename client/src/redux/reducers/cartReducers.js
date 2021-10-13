import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case actionTypes.REMOVE_FROM_CART:
      if (action.payload.length >= 1) {
        console.log("borra todo");
        // console.log(action.payload.map((product) => product._id));
        return CART_INITIAL_STATE;
      } else {
        console.log("borra uno");
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (product) => product._id !== action.payload._id
          ),
        };
      }
    case actionTypes.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
