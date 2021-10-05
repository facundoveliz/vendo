import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <div className="navbar-left">
          <li>
            <Link to="/">
              <a href="">Home</a>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <a href="">Profile</a>
            </Link>
          </li>
        </div>
        <div className="navbar-right">
          <li>
            <Link to="/login">
              <a href="">Log in</a>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <a href="">Sign Up</a>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
