import React from "react";
import { addOrder } from "./fetchActions";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// actions
import { removeFromCart } from "../../redux/actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const history = useHistory();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const checkout = () => {
    // decodes tde token and use it to take tde id of tde current cart
    const token = Cookies.get("jwtToken");
    if (!token) return toast.warn("You need to be logged!");
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
    addOrder(orderData).then((res) => {
      dispatch(removeFromCart(cart));
      history.push("/");
    });
    toast.promise(addOrder, {
      pending: "Sending order, please wait...",
      success: "Thanks for shopping! Order sended.",
      error: "There was an error 😞",
    });
  };

  return (
    <div className="cart">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map((product) => {
            return (
              <div key={product._id} className="cart-container">
                <div className="cart-product-info">
                  <div className="cart-image">
                    <img
                      src={
                        product.imageUrl.length > 15
                          ? product.imageUrl
                          : "/uploads/products/default.jpg"
                      }
                      alt={product.name}
                    />
                  </div>
                  <p>{product.name}</p>
                </div>
                <p> ${product.price.toLocaleString()}</p>
                <button onClick={() => handleRemoveFromCart(product)}>X</button>
              </div>
            );
          })}
          <div className="cart-checkout">
            <p>
              Total:
              {cart.map((product) => product.price).reduce((a, b) => a + b, 0).toLocaleString()}
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
