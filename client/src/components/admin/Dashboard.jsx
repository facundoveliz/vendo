import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const handleReturn = () => {
    window.location.href = "/";
  };
  return (
    <div className="table">
      <div className="table-title">
        <h1>Dashboard</h1>
        <button onClick={handleReturn}>Back</button>
        <div>
          <Link to="/user-list">
            <button>Users</button>
          </Link>
          <Link to="/product-list">
            <button>Products</button>
          </Link>
          <Link to="/order-list">
            <button>Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
