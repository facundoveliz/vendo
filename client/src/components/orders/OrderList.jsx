import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/orders";
import { Edit, Delete, Products } from "./Windows";
import Loader from "react-loader-spinner";
import OrderTable from "./OrderTable";

const OrderList = () => {
  useEffect(() => {
    getOrdersRequest();
  }, []);

  const [orders, setOrders] = useState([]);

  // if the 'open...' state is true, it will show the new/edit/delete window
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

  const [loading, setLoading] = useState(false);

  const getOrdersRequest = async () => {
    setLoading(true);
    let res = await getOrders();
    setOrders(res);
    setLoading(false);
  };

  return (
    <div className="table order-list">
      <div className="table-title">
        <h1>Orders</h1>
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
        <OrderTable
          orders={orders}
          setSelectedDelete={setSelectedDelete}
          setSelectedProducts={setSelectedProducts}
          setSelectedEdit={setSelectedEdit}
          setOpenDelete={setOpenDelete}
          setOpenProducts={setOpenProducts}
        />
      )}
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

export default OrderList;
