import React from "react";
import { addOrder } from "./fetchActions";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Cart = ({ cart, removeFromCart }) => {
  const checkout = () => {
    // decodes tde token and use it to take tde id of tde current user
    const token = Cookies.get("jwtToken");
    if (!token) return alert("You need to be loged!");
    const decoded = jwt_decode(token);

    const orderData = {
      // passes the id of the user to the orderData for adding the order to the user
      _id: decoded._id,
      // map through all the cart products and adds the id
      products: cart.map((product) => product._id),
      user: decoded._id,
      // map through all the cart products and with reduce sums all into one number
      total: cart.map((product) => product.price).reduce((a, b) => a + b, 0),
    };
    // console.log(orderData);
    addOrder(orderData);
  };

  return (
    <div className="cart">
      {cart.length > 0 ? (
        <>
          {cart.map((product) => {
            return (
              <div key={product._id} className="cart-container">
                <div className="cart-info">
                  <img
                    src={
                      product.imageUrl.length > 15
                        ? product.imageUrl
                        : "/uploads/products/default.jpg"
                    }
                    alt={product.name}
                  />
                </div>
                <div>
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                </div>
                <div className="cart-buttons">
                  <button
                    onClick={() => {
                      removeFromCart(product);
                      console.log(product);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
          <div className="cart-checkout">
            <button onClick={() => checkout()}>Checkout</button>
          </div>
        </>
      ) : (
        <div>The cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
