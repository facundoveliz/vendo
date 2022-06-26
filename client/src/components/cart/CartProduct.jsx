import React from 'react';
import PropTypes from 'prop-types';

function CartProduct({ product, handleRemoveFromCart }) {
  return (
    <tr key={product._id}>
      <td className="cart-image">
        <img
          src={
            product.imageUrl.length > 15
              ? product.imageUrl
              : '/uploads/products/default.jpg'
          }
          alt={product.name}
        />
      </td>
      <td>
        <p>{product.name}</p>
      </td>
      <td>
        <p>
          $
          {product.price.toLocaleString()}
        </p>
      </td>
      <td>
        <p onClick={() => handleRemoveFromCart(product)}>Remove</p>
      </td>
    </tr>
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
