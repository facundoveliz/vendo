import React, { useState, useEffect } from "react";
import { getProducts } from "./fetchActions";
import { Add, Edit, Delete } from "./Windows";
import ProductTable from "./ProductTable";

import Loader from "react-loader-spinner";

const ProductList = () => {
  useEffect(() => {
    getProductsRequest();
  }, []);

  const [products, setProducts] = useState([]);

  // if the 'open...' state is true, it will show the new/edit/delete window
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // this passes the selected product to the window
  const [selectedEdit, setSelectedEdit] = useState({
    _id: "",
    name: "",
    price: "",
    image: null,
    description: "",
  });

  // this passes the id of the selected product to delete
  const [selectedDelete, setSelectedDelete] = useState("");

  const [loading, setLoading] = useState(false);

  const getProductsRequest = async () => {
    setLoading(true);
    setProducts(await getProducts());
    setLoading(false);
  };

  return (
    <div className="table product-list">
      <div className="table-title">
        <h1>Products</h1>
      </div>
      {loading ? (
        <Loader
          type="Oval"
          color="#627884"
          height={200}
          width={200}
          className="loading"
        />
      ) : (
        <ProductTable
          setOpenNew={setOpenNew}
          setSelectedEdit={setSelectedEdit}
          selectedEdit={selectedEdit}
          setOpenEdit={setOpenEdit}
          setSelectedDelete={setSelectedDelete}
          setOpenDelete={setOpenDelete}
          products={products}
        />
      )}
      {openNew ? (
        <Add setOpenNew={setOpenNew} getProductsRequest={getProductsRequest} />
      ) : null}
      <div>
        {openEdit ? (
          <Edit
            setOpenEdit={setOpenEdit}
            selectedEdit={selectedEdit}
            getProductsRequest={getProductsRequest}
          />
        ) : null}
        {openDelete ? (
          <Delete
            setOpenDelete={setOpenDelete}
            selectedDelete={selectedDelete}
            getProductsRequest={getProductsRequest}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductList;
