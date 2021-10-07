import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { getOrders } from "../home/fetchActions";
import { Edit, Delete, Products } from "./Windows";

const Dashboard = () => {
  useEffect(() => {
    getOrdersRequest();
  }, []);

  const [orders, setOrders] = useState([]);

  // this allows to show to image
  const [image, setImage] = useState("");
  const [imageViewer, setImageViewer] = useState(false);

  // if the 'open...' state is true, it will show the new/edit/delete window
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  // this passes the selected order to the window
  const [selectedEdit, setSelectedEdit] = useState({
    _id: "",
    name: "",
    price: "",
    image: null,
    description: "",
  });

  // this passes the id of the selected order to delete
  const [selectedDelete, setSelectedDelete] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");

  const getOrdersRequest = async () => {
    let res = await getOrders();
    setOrders(res);
    console.log(res);
  };

  const handleReturn = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="table order-list">
      <div className="table-title">
        <h1>Orders</h1>
        <button onClick={handleReturn}>Back</button>
      </div>
      <table>
        <button onClick={() => setOpenNew(true)}>Add New</button>
        <tbody>
          {imageViewer ? (
            <div className="image-viewer">
              <img
                src={`/uploads/orders/${image}`}
                alt={image}
                onClick={() => {
                  setImageViewer(false);
                }}
              />
            </div>
          ) : null}
          <tr>
            <th>Purchased</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Status</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td
                  onClick={() => {
                    setOpenProducts(true);
                    setSelectedProducts(order.products);
                  }}
                  className="pointer"
                >
                  {order.products.length > 1
                    ? `${order.products[0].name} and ${
                        order.products.length - 1
                      } more...`
                    : `${order.products[0].name}`}
                </td>
                <td>{order.user.name}</td>
                <td>{order.user.email}</td>
                <td>Pending</td>
                <td>${order.total}</td>
                <td>{dateFormat(order.created, "d mmm, HH:MM")}</td>
                <td>
                  <button
                  // onClick={() => {
                  //   setOpenEdit(true);
                  //   setSelectedEdit({ ...selectedEdit, ...order });
                  // }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      {
                        setOpenDelete(true);
                        setSelectedDelete(order._id);
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
      <div>
        {openEdit ? (
          <Edit
            setOpenEdit={setOpenEdit}
            selectedEdit={selectedEdit}
            getOrdersRequest={getOrdersRequest}
          />
        ) : null}
        {openDelete ? (
          <Delete
            setOpenDelete={setOpenDelete}
            selectedDelete={selectedDelete}
            getOrdersRequest={getOrdersRequest}
          />
        ) : null}
        {openProducts ? (
          <Products
            setOpenProducts={setOpenProducts}
            selectedProducts={selectedProducts}
            getOrdersRequest={getOrdersRequest}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
