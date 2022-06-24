import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (data) => {
    dispatch(addToCart(data));
  };

  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };

  const isInCart = (data) => !!cart.find((item) => item._id === data._id);

  // FIX: check line 26 to 28
  return (
    <div className="card" key={product._id}>
      <div className="card-image-container">
        <img
          src={
            product.imageUrl.length > 15
              ? product.imageUrl
              : '/uploads/products/default.jpg'
          }
          alt={product.name}
        />
      </div>
      <p>{product.name}</p>
      <p>
        $
        {product.price.toLocaleString()}
      </p>
      {isInCart(product) ? (
        <button
          type="button"
          className="button-secondary"
          onClick={() => handleRemoveFromCart(product)}
        >
          Remove from cart
        </button>
      ) : (
        <button
          type="button"
          className="secondary"
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
