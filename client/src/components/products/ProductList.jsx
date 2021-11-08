import React, { useState, useEffect } from "react";
import { getProducts } from "./fetchActions";
import AddProduct from "./AddProduct";
import { Edit, Delete } from "./Windows";
import Loader from "react-loader-spinner";

const ProductList = () => {
  useEffect(() => {
    getProductsRequest();
  }, []);

  const [products, setProducts] = useState([]);

  // this allows to show to image
  const [image, setImage] = useState("");
  const [imageViewer, setImageViewer] = useState(false);

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
    let res = await getProducts();
    setProducts(res);
    setLoading(false);
  };

  return (
    <div className="table product-list">
      {openNew ? (
        <AddProduct
          setOpenNew={setOpenNew}
          getProductsRequest={getProductsRequest}
        />
      ) : null}
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
        <table>
          <button onClick={() => setOpenNew(true)}>Add New</button>
          <tbody>
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
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price.toLocaleString()}</td>
                  <td
                    onClick={() => {
                      setImage(product.imageUrl);
                      setImageViewer(true);
                    }}
                    className="image"
                  >
                    {product.imageKey ? product.imageKey : "default.jpg"}
                  </td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setSelectedEdit({ ...selectedEdit, ...product });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        {
                          setOpenDelete(true);
                          setSelectedDelete(product._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
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
