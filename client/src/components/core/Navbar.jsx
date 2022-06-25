import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  FiHome, FiShoppingCart, FiUser, FiAlignJustify,
} from 'react-icons/fi';

import { logoutUser } from '../../api/auth';

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const token = localStorage.getItem('x-auth-token');
  const cart = useSelector((state) => state.cart.cartItems);

  // TODO: find a better place for these
  // <NavLink to="/user-list" title="Users">
  // <img src="/icons/users.svg" alt="" />
  // </NavLink>
  // <NavLink to="/product-list" title="Products">
  // <img src="/icons/product.svg" alt="" />
  // </NavLink>
  // <NavLink to="/order-list" title="Orders">
  // <img src="/icons/order.svg" alt="" />
  // </NavLink>
  useEffect(() => {
    setShowMobileMenu();
  }, []);

  return (
    <nav>
      <h2>Vendo.</h2>
      <FiAlignJustify
        className="nav-hamburger"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      />
      <div className={showMobileMenu ? 'nav-mobile' : 'nav-screen'}>
        <NavLink
          to="/"
          exact
          title="Home"
          className="nav-item"
          onClick={() => setShowMobileMenu(false)}
        >
          <FiHome className="nav-icon" />
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/cart"
          title="Cart"
          className="nav-item"
          onClick={() => setShowMobileMenu(false)}
        >
          <FiShoppingCart className="nav-icon" />
          <p>Cart</p>
          {cart.length > 0 ? <p className="nav-cart">{cart.length}</p> : null}
        </NavLink>
        <NavLink
          to="/profile"
          title="Profile Settings"
          className="nav-item"
          onClick={() => setShowMobileMenu(false)}
        >
          <FiUser className="nav-icon" />
          <p>Profile</p>
        </NavLink>
        {!token ? (
          <NavLink
            to="/login"
            title="Login"
            className="nav-item"
            onClick={() => setShowMobileMenu(false)}
          >
            <button type="button">Login</button>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            title="Logout"
            onClick={() => {
              logoutUser();
              setShowMobileMenu(false);
            }}
            className="nav-item"
          >
            <button className="button-secondary" type="button">
              Logout
            </button>
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
