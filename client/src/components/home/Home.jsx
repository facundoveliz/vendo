import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import { getProducts } from "../products/fetchActions";

const Home = () => {
  useEffect(() => {
    getProductsRequest();
    console.log(process.env.REACT_APP_API_URL);
  }, []);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getProductsRequest = async () => {
    let res = await getProducts();
    setProducts(res);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item !== product));
  };

  const isInCart = (product) => {
    return !!cart.find((item) => item._id === product._id);
  };

  return (
    <div className="home">
      <h1>Welcome to Vendo.</h1>
      <div>
        <div className="card-container">
          {products.map((product) => {
            return (
              <div key={product._id} className="card">
                <img
                  src={
                    product.imageUrl.length > 15
                      ? product.imageUrl
                      : "/uploads/products/default.jpg"
                  }
                  alt={product.name}
                />
                <p>{product.name}</p>
                <p>${product.price}</p>
                {isInCart(product) ? (
                  <button onClick={(e) => removeFromCart(product)}>
                    Remove from cart
                  </button>
                ) : (
                  <button onClick={(e) => addToCart(product)}>
                    Add to cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {/* <Cart cart={cart} removeFromCart={removeFromCart} /> */}
      </div>
    </div>
  );
};

export default Home;
