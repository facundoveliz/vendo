import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutUser } from "../users/fetchActions";

const Navbar = () => {
  const token = Cookies.get("jwtToken");

  return (
    <div className="navbar">
      <ul>
        <Link to="/">
          <li>
            <img src="/icons/home.svg" alt="" />
          </li>
        </Link>
        <Link to="/user-list">
          <li>
            <img src="/icons/users.svg" alt="" />
          </li>
        </Link>
        <Link to="/product-list">
          <li>
            <img src="/icons/product.svg" alt="" />
          </li>
        </Link>
        <Link to="/order-list">
          <li>
            <img src="/icons/order.svg" alt="" />
          </li>
        </Link>
        <Link to="/profile">
          <li>
            <img src="/icons/settings.svg" alt="" />
          </li>
        </Link>
        {!token ? (
          <>
            <Link to="/login">
              <li>
                <img src="/icons/login.svg" alt="" />
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <li>
                <img
                  src="/icons/logout.svg"
                  alt=""
                  onClick={() => logoutUser()}
                />
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
