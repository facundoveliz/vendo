import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="not-found">
    <h1>404</h1>
    <h2>Not Found</h2>
    <p>
      We're sorry, the page you requested could not be found. Please go back to
      the home page our contact us.
    </p>
    <Link to="/">
      <button>Go Home</button>
    </Link>
  </div>
);

export default NotFound;
