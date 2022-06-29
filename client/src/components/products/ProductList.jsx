import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';

import { getProducts } from '../../api/products';
import { Add, Edit, Delete } from './Windows';
import ProductTable from './ProductTable';

function ProductList() {
  const [products, setProducts] = useState([]);

  // if the 'open...' state is true, it will show the new/edit/delete window
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // this passes the selected product to the window
  const [selectedEdit, setSelectedEdit] = useState({
    _id: '',
    name: '',
    price: '',
    image: null,
    description: '',
  });

  // this passes the id of the selected product to delete
  const [selectedDelete, setSelectedDelete] = useState('');

  const [loading, setLoading] = useState(false);

  const getProductsRequest = async () => {
    setLoading(true);
    setProducts(await getProducts());
    setLoading(false);
  };

  useEffect(() => {
    getProductsRequest();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1>Products</h1>
      {loading ? (
        <Loader type="Oval" color="#627884" height={200} width={200} />
      ) : (
        <div>
          <div className="dashboard-buttons">
            <button type="submit" onClick={() => setOpenNew(true)}>
              Add New
            </button>
            <NavLink to="/admin">
              <button type="button">Return</button>
            </NavLink>
          </div>
          <ProductTable
            setOpenNew={setOpenNew}
            setSelectedEdit={setSelectedEdit}
            selectedEdit={selectedEdit}
            setOpenEdit={setOpenEdit}
            setSelectedDelete={setSelectedDelete}
            setOpenDelete={setOpenDelete}
            products={products}
          />
        </div>
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
}

export default ProductList;
