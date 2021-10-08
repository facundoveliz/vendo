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

  // this allows to show to image
  const [image, setImage] = useState("");
  const [imageViewer, setImageViewer] = useState(false);

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
          {imageViewer ? (
            <div className="image-viewer">
              <img
                src={
                  image.length > 15 ? image : "/uploads/products/default.jpg"
                }
                alt={image}
                onClick={() => {
                  setImageViewer(false);
                }}
              />
            </div>
          ) : null}
          {products.map((product) => {
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
                    onClick={() => {
                      setImage(product.imageUrl);
                      setImageViewer(true);
                    }}
                  />
                </div>
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
        <Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
};

export default Home;
