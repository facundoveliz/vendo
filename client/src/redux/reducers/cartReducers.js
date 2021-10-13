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
      // if the payload is an array, it will remove all
      // objects, this happens for deleting on checkout
      // if not, it will remove only one item, this
      // happens when deleting only one item from cart
      if (action.payload.length >= 1) {
        return CART_INITIAL_STATE;
      } else {
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
