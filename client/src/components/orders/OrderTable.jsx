import React from 'react';
import toast from 'react-hot-toast';
import dateFormat from 'dateformat';

function OrderTable({
  orders,
  setSelectedDelete,
  setSelectedProducts,
  setOpenDelete,
  setOpenProducts,
}) {
  return (
    <table>
      <button
        type="submit"
        onClick={() => toast('Feature not available yet.', {
          icon: '🤧',
        })}
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
            <td>
              $
              {order.total.toLocaleString()}
            </td>
            <td>{dateFormat(order.created, 'd mmm, HH:MM')}</td>
            <td>
              <img
                src="/icons/edit.svg"
                alt=""
                onClick={() => toast('Feature not available yet.', {
                  icon: '🤧',
                })}
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
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
