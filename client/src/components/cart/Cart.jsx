import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postOrder } from "../../api/orders";
import { removeFromCart } from "../../redux/actions/cartActions";
import CartProduct from "./CartProduct";

import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const history = useHistory();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const checkout = () => {
    // decodes tde token and use it to take tde id of tde current cart
    const token = localStorage.getItem("x-auth-token");
    if (!token) return toast.error("You need to be logged!");
    const decoded = jwt_decode(token);

    const orderData = {
      // passes the id of the cart to the orderData for adding the order to the cart
      _id: decoded._id,
      // map through all the cart products and adds the id
      products: cart.map((product) => product._id),
      cart: decoded._id,
      // map through all the cart products and with reduce sums all into one number
      total: cart.map((product) => product.price).reduce((a, b) => a + b, 0),
    };
    toast.promise(
      postOrder(orderData).then((res) => {
        dispatch(removeFromCart(cart));
        history.push("/");
      }),
      {
        loading: "Loading",
        success: (res) => `Thanks for shopping`,
        error: (err) => `An error ocurred`,
      }
    );
  };

  return (
    <div className="cart">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map((product) => {
            return (
              <CartProduct
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            );
          })}
          <div className="cart-checkout">
            <p>
              Total:
              {cart
                .map((product) => product.price)
                .reduce((a, b) => a + b, 0)
                .toLocaleString()}
            </p>
            <button onClick={() => checkout()}>Checkout</button>
          </div>
        </div>
      ) : (
        <p className="cart-empty">The cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
