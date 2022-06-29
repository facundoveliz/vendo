import React from 'react';
import toast from 'react-hot-toast';
import dateFormat from 'dateformat';

import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function OrderTable({
  orders,
  setSelectedDelete,
  setSelectedProducts,
  setOpenDelete,
  setOpenProducts,
}) {
  return (
    <div className="dashboard-table">
      <table>
        <thead>
          <tr>
            <th>Purchased</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td
                onClick={() => {
                  setOpenProducts(true);
                  setSelectedProducts(order.products);
                }}
              >
                <p>
                  {order.products.length === 0
                    ? 'Products deleted'
                    : order.products[0].name}
                </p>
              </td>
              <td>
                <p>{order.user ? order.user.name : 'User deleted'}</p>
              </td>
              <td>
                <p>{order.user ? order.user.email : 'User deleted'}</p>
              </td>
              <td>
                <p>
                  $
                  {order.total.toLocaleString()}
                </p>
              </td>
              <td>
                <p>{dateFormat(order.created, 'd mmm, HH:MM')}</p>
              </td>
              <td>
                <FiEdit2
                  onClick={() => toast('Feature not available yet.', {
                    icon: '🤧',
                  })}
                />
                <FiTrash2
                  onClick={() => {
                    setOpenDelete(true);
                    setSelectedDelete(order._id);
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

export default OrderTable;
