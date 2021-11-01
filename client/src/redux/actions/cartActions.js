import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
};

export const removeFromCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
};
