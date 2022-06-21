import React from 'react';
import PropTypes from 'prop-types';

function CartProduct({ product, handleRemoveFromCart }) {
  return (
    <div>
      <div key={product._id} className="cart-container">
        <div className="cart-product-info">
          <div className="cart-image">
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
        </div>
        <p>
          {' '}
          $
          {product.price.toLocaleString()}
        </p>
        <button type="button" onClick={() => handleRemoveFromCart(product)}>
          X
        </button>
      </div>
    </div>
  );
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
  }).isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default CartProduct;
