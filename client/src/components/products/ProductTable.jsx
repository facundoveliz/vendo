import React, { useState } from "react";

const ProductTable = ({
  products,
  setOpenNew,
  setSelectedEdit,
  selectedEdit,
  setOpenEdit,
  setSelectedDelete,
  setOpenDelete,
}) => {
  // this allows to show to image
  const [image, setImage] = useState("");
  const [imageViewer, setImageViewer] = useState(false);

  return (
    <table>
      <button className="table-new-button" onClick={() => setOpenNew(true)}>
        Add New
      </button>
      <tbody>
        {imageViewer ? (
          <div className="image-viewer">
            <img
              src={image.length > 15 ? image : "/uploads/products/default.jpg"}
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
                <img
                  src="/icons/edit.svg"
                  alt=""
                  onClick={() => {
                    setOpenEdit(true);
                    setSelectedEdit({ ...selectedEdit, ...product });
                  }}
                />
                <img
                  src="/icons/trash.svg"
                  alt=""
                  onClick={() => {
                    setOpenDelete(true);
                    setSelectedDelete(product._id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;
