import React from "react";
import dateFormat from "dateformat";

import { toast } from "react-toastify";

const OrderTable = ({
  orders,
  setSelectedDelete,
  setSelectedProducts,
  setOpenDelete,
  setOpenProducts,
}) => {
  return (
    <table>
      <button
        className="table-new-button"
        onClick={() => toast.warn("Feature not available yet.")}
      >
        Add New
      </button>
      <tbody>
        <tr>
          <th>Purchased</th>
          <th>Customer</th>
          <th>Email</th>
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
                {/* if all the products has been deleted, it will show a string informing that,
                  and if the products are more than one, it will show only one and will inform
                  the number of products left that are not appearing */}
                <p className="table-see-more">
                  {order.products.length === 0
                    ? "Products deleted"
                    : order.products.length > 1
                    ? `${order.products[0].name} and ${
                        order.products.length - 1
                      } more...`
                    : `${order.products[0].name}`}
                </p>
              </td>
              {order.user ? (
                <>
                  <td>{order.user.name}</td>
                  <td>{order.user.email}</td>
                </>
              ) : (
                <>
                  <td>User deleted</td>
                  <td>User deleted</td>
                </>
              )}
              <td>${order.total.toLocaleString()}</td>
              <td>{dateFormat(order.created, "d mmm, HH:MM")}</td>
              <td>
                <img
                  src="/icons/edit.svg"
                  alt=""
                  onClick={() => toast.warn("Feature not available yet.")}
                />
                <img
                  src="/icons/trash.svg"
                  alt=""
                  onClick={() => {
                    setOpenDelete(true);
                    setSelectedDelete(order._id);
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

export default OrderTable;
