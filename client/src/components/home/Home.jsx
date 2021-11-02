import React, { useState, useEffect } from "react";
import { getProducts } from "../products/fetchActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

// actions
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const Home = () => {
  useEffect(() => {
    getProductsRequest();
  }, []);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const [products, setProducts] = useState([]);

  // this allows to show to image
  const [image, setImage] = useState("");
  const [imageViewer, setImageViewer] = useState(false);

  const [loading, setLoading] = useState(false);

  const getProductsRequest = async () => {
    setLoading(true);
    let res = await getProducts();
    setProducts(res);
    setLoading(false);
  };

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
    <div className="home">
      <h1>Welcome to Vendo.</h1>
      {loading ? (
        <Loader
          type="Oval"
          color="#e79e4f"
          height={200}
          width={200}
          className="loading"
        />
      ) : (
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
                    <button
                      className="card-added-button"
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      Remove from cart
                    </button>
                  ) : (
                    <button onClick={() => handleAddToCart(product)}>
                      Add to cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
