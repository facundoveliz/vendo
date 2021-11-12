import React, { useState, useEffect } from "react";
import { getProducts } from "../products/fetchActions";
import ProductCard from "../products/ProductCard";

import Loader from "react-loader-spinner";

const Home = () => {
  useEffect(() => {
    getProductsRequest();
  }, []);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const getProductsRequest = async () => {
    setLoading(true);
    let res = await getProducts();
    setProducts(res);
    setLoading(false);
  };

  return (
    <div className="home">
      <h1>Welcome to Vendo.</h1>
      {loading ? (
        <Loader
          type="Oval"
          color="#627884"
          height={200}
          width={200}
          className="loading"
        />
      ) : (
        <div>
          <div className="card-container">
            {products.map((product) => {
              return <ProductCard product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
