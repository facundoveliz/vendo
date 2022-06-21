import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/cartConstants';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      // if the payload is an array, it will remove all
      // objects, this happens for deleting on checkout
      // if not, it will remove only one item, this
      // happens when deleting only one item from cart
      if (action.payload.length >= 1) {
        return initialState;
      }
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product._id !== action.payload._id,
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
