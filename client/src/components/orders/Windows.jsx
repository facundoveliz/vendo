import React from 'react';
import toast from 'react-hot-toast';
import { deleteOrder } from '../../api/orders';

export const Edit = () => {};

export function Delete({ setOpenDelete, selectedDelete, getOrdersRequest }) {
  const handleDelete = (id) => {
    toast.promise(
      deleteOrder(id).then(() => {
        getOrdersRequest();
        setOpenDelete(false);
      }),
      {
        loading: 'Loading',
        success: () => 'Order deleted',
        error: () => 'An error ocurred',
      },
    );
  };

  return (
    <div className="delete-container">
      <div className="delete">
        <div className="delete-title">
          <h1>Delete Order</h1>
        </div>
        <div className="delete-text" />
        <div className="delete-button">
          <button type="submit" onClick={() => handleDelete(selectedDelete)}>
            Yes
          </button>
          <button type="button" onClick={() => setOpenDelete(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function Products({ setOpenProducts, selectedProducts }) {
  return (
    <div className="input-container">
      <div className="input">
        <div className="input-title">
          <h1>Products</h1>
          <button type="button" onClick={() => setOpenProducts(false)}>
            Close
          </button>
        </div>
        <div>
          {selectedProducts.map((product) => (
            <p>
              {product.name}
              {' '}
              $
              {product.price.toLocaleString()}
            </p>
          ))}
        </div>
        <div className="input-input" />
      </div>
    </div>
  );
}
