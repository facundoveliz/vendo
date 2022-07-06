import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';

import {
  FiHome,
  FiShoppingCart,
  FiUser,
  FiAlignJustify,
  FiDatabase,
} from 'react-icons/fi';

import { logoutUser } from '../../api/auth';

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const token = localStorage.getItem('x-auth-token');
  let decoded;
  if (token) {
    decoded = jwt(token);
  }

  const cart = useSelector((state) => state.cart.cartItems);

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
        {decoded?.isAdmin ? (
          <NavLink
            to="/admin"
            title="Admin Dashboard"
            className="nav-item"
            onClick={() => setShowMobileMenu(false)}
          >
            <FiDatabase className="nav-icon" />
            <p>Dashboard</p>
          </NavLink>
        ) : null}
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
