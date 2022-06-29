import React from 'react';

import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function ProductTable({
  products,
  setSelectedEdit,
  selectedEdit,
  setOpenEdit,
  setSelectedDelete,
  setOpenDelete,
}) {
  return (
    <div className="dashboard-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <p>{product.name}</p>
              </td>
              <td>
                <p>
                  $
                  {product.price.toLocaleString()}
                </p>
              </td>
              <td>
                <img
                  src={
                    product.imageUrl.length > 15
                      ? product.imageUrl
                      : '/uploads/products/default.jpg'
                  }
                  alt={product.imageUrl}
                />
              </td>
              <td>
                <p>{product.description}</p>
              </td>
              <td>
                <FiEdit2
                  onClick={() => {
                    setOpenEdit(true);
                    setSelectedEdit({ ...selectedEdit, ...product });
                  }}
                />
                <FiTrash2
                  onClick={() => {
                    setOpenDelete(true);
                    setSelectedDelete(product._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
