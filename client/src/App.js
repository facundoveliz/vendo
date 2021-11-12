import React from "react";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import UserProfile from "./components/users/UserProfile";

import UserList from "./components/users/UserList";
import ProductList from "./components/products/ProductList";
import OrderList from "./components/orders/OrderList";

import Cart from "./components/cart/Cart";

import Home from "./components/core/Home";
import Navbar from "./components/core/Navbar";
import NotFound from "./components/core/NotFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoggedRoute, AdminRoute } from "./utils/PrivateRoutes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./sass/main.scss";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Switch>
        {/* logged routes */}
        <LoggedRoute component={UserProfile} path="/profile" exact />

        {/* admin routes */}
        <AdminRoute component={UserList} path="/user-list" exact />
        <AdminRoute component={ProductList} path="/product-list" exact />
        <AdminRoute component={OrderList} path="/order-list" exact />

        {/* normal routes */}
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />

        {/* not found routes */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
