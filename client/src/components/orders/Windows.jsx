import React from "react";
import { deleteOrder } from "./fetchActions";

export const Edit = ({ setOpenEdit, selectedEdit, getOrdersRequest }) => {};

export const Delete = ({ setOpenDelete, selectedDelete, getOrdersRequest }) => {
  const handleDelete = (id) => {
    deleteOrder(id).then((res) => {
      getOrdersRequest();
      setOpenDelete(false);
    });
  };

  return (
    <div className="delete-container">
      <div className="delete">
        <div className="delete-title">
          <h1>Delete Order</h1>
        </div>
        <div className="delete-text"></div>
        <div className="delete-button">
          <button onClick={() => handleDelete(selectedDelete)}>Yes</button>
          <button onClick={() => setOpenDelete(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export const Products = ({ setOpenProducts, selectedProducts }) => {
  return (
    <div className="input-container">
      <div className="input">
        <div className="input-title">
          <h1>Products</h1>
          <button onClick={() => setOpenProducts(false)}>Close</button>
        </div>
        <div>
          {selectedProducts.map((product) => {
            return (
              <p>
                {product.name} ${product.price.toLocaleString()}
              </p>
            );
          })}
        </div>
        <div className="input-input"></div>
      </div>
    </div>
  );
};
