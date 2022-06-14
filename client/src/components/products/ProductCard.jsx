import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

function ProductCard({ selectedProduct }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const isInCart = (product) => !!cart.find((item) => item._id === product._id);

  return (
    <div key={selectedProduct._id} className="card">
      <div className="card-image-container">
        <img
          src={
            selectedProduct.imageUrl.length > 15
              ? selectedProduct.imageUrl
              : '/uploads/products/default.jpg'
          }
          alt={selectedProduct.name}
        />
      </div>
      <p>{selectedProduct.name}</p>
      <p>
        $
        {selectedProduct.price.toLocaleString()}
      </p>
      {isInCart(selectedProduct) ? (
        <button
          type="button"
          className="card-added-button"
          onClick={() => handleRemoveFromCart(selectedProduct)}
        >
          Remove from cart
        </button>
      ) : (
        <button type="submit" onClick={() => handleAddToCart(selectedProduct)}>
          Add to cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
