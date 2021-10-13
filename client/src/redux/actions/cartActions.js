import * as actionTypes from "../constants/cartConstants";

export const addToCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: product,
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
};

export const removeFromCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: product,
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
};

export const removeAllFromCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_ALL_FROM_CART,
      payload: product,
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
};
