import React from "react";

const CartProduct = ({ product, handleRemoveFromCart }) => {
  return (
    <div>
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
    </div>
  );
};

export default CartProduct;
