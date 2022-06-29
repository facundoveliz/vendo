import React from 'react';
import { NavLink } from 'react-router-dom';

import { FiArchive, FiPackage, FiUsers } from 'react-icons/fi';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-sections">
        <NavLink to="admin/users" title="Users" className="dashboard-item">
          <FiUsers />
          <h2>Users</h2>
        </NavLink>
        <NavLink to="admin/products" title="Users" className="dashboard-item">
          <FiArchive />
          <h2>Products</h2>
        </NavLink>
        <NavLink to="admin/orders" title="Users" className="dashboard-item">
          <FiPackage />
          <h2>Orders</h2>
        </NavLink>
      </div>
    </div>
  );
}

export default Dashboard;
