import React from "react";
import Profile from "./components/users/UserProfile";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoggedRoute, AdminRoute } from "./utils/PrivateRoutes";
import UserList from "./components/users/UserList";
import AddProduct from "./components/products/AddProduct";
import ProductList from "./components/products/ProductList";
import OrderList from "./components/orders/OrderList";
import Home from "./components/home/Home";
import Navbar from "./components/home/Navbar";
import "./sass/main.scss";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <LoggedRoute component={Profile} path="/profile" exact />
          <AdminRoute component={UserList} path="/user-list" exact />
          <AdminRoute component={AddProduct} path="/add-product" exact />
          <AdminRoute component={ProductList} path="/product-list" exact />
          <AdminRoute component={OrderList} path="/order-list" exact />
        </Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </div>
    </Router>
  );
}

export default App;
