import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const isInCart = (product) => {
    return !!cart.find((item) => item._id === product._id);
  };

  return (
    <div key={product._id} className="card">
      <div className="card-image-container">
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
      <p>${product.price.toLocaleString()}</p>
      {isInCart(product) ? (
        <button
          className="card-added-button"
          onClick={() => handleRemoveFromCart(product)}
        >
          Remove from cart
        </button>
      ) : (
        <button onClick={() => handleAddToCart(product)}>Add to cart</button>
      )}
    </div>
  );
};

export default ProductCard;
