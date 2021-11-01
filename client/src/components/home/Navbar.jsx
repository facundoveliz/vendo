import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutUser } from "../users/fetchActions";
import { useSelector } from "react-redux";

const Navbar = () => {
  const token = Cookies.get("jwtToken");
  const cart = useSelector((state) => state.cart.cartItems);

  return (
    <div className="navbar">
      <ul>
        <Link to="/" title="Home">
          <li>
            <img src="/icons/home.svg" alt="" />
          </li>
        </Link>
        <Link to="/cart" title="Cart">
          <li>
            <img src="/icons/cart.svg" alt="" />
            {cart.length > 0 ? (
              <div>
                <p>{cart.length}</p>
              </div>
            ) : null}
          </li>
        </Link>
        <Link to="/user-list" title="Users">
          <li>
            <img src="/icons/users.svg" alt="" />
          </li>
        </Link>
        <Link to="/product-list" title="Products">
          <li>
            <img src="/icons/product.svg" alt="" />
          </li>
        </Link>
        <Link to="/order-list" title="Orders">
          <li>
            <img src="/icons/order.svg" alt="" />
          </li>
        </Link>
        <Link to="/profile" title="Profile Settings">
          <li>
            <img src="/icons/settings.svg" alt="" />
          </li>
        </Link>
        {!token ? (
          <>
            <Link to="/login" title="Login">
              <li>
                <img src="/icons/login.svg" alt="" />
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" title="Logout">
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
