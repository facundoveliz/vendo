import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const token = localStorage.getItem("x-auth-token");
  const cart = useSelector((state) => state.cart.cartItems);

  return (
    <div className="navbar">
      <ul>
        <NavLink
          to="/"
          exact={true}
          title="Home"
          activeClassName="navbar-selected"
        >
          <li>
            <img src="/icons/home.svg" alt="" />
          </li>
        </NavLink>
        <NavLink to="/cart" title="Cart" activeClassName="navbar-selected">
          <li>
            <img src="/icons/cart.svg" alt="" />
            {cart.length > 0 ? (
              <div>
                <p>{cart.length}</p>
              </div>
            ) : null}
          </li>
        </NavLink>
        <NavLink
          to="/user-list"
          title="Users"
          activeClassName="navbar-selected"
        >
          <li>
            <img src="/icons/users.svg" alt="" />
          </li>
        </NavLink>
        <NavLink
          to="/product-list"
          title="Products"
          activeClassName="navbar-selected"
        >
          <li>
            <img src="/icons/product.svg" alt="" />
          </li>
        </NavLink>
        <NavLink
          to="/order-list"
          title="Orders"
          activeClassName="navbar-selected"
        >
          <li>
            <img src="/icons/order.svg" alt="" />
          </li>
        </NavLink>
        <NavLink
          to="/profile"
          title="Profile Settings"
          activeClassName="navbar-selected"
        >
          <li>
            <img src="/icons/settings.svg" alt="" />
          </li>
        </NavLink>
        {!token ? (
          <>
            <NavLink
              to="/login"
              title="Login"
              activeClassName="navbar-selected"
            >
              <li>
                <img src="/icons/login.svg" alt="" />
              </li>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              title="Logout"
              activeClassName="navbar-selected"
            >
              <li>
                <img
                  src="/icons/logout.svg"
                  alt=""
                  onClick={() => logoutUser()}
                />
              </li>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
