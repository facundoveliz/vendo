import React from 'react';
import { Toaster } from 'react-hot-toast';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import UserProfile from './components/users/UserProfile';

import Dashboard from './components/admin/Dashboard';
import UserList from './components/users/UserList';
import ProductList from './components/products/ProductList';
import OrderList from './components/orders/OrderList';

import Cart from './components/cart/Cart';

import Home from './components/core/Home';
import Navbar from './components/core/Navbar';
import NotFound from './components/core/NotFound';

import { LoggedRoute, AdminRoute } from './utils/PrivateRoutes';

import './sass/main.scss';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'toast',
        }}
      />
      <Router>
        <Navbar />
        <Switch>
          {/* logged routes */}
          <LoggedRoute component={UserProfile} path="/profile" exact />

          {/* normal routes */}
          <Route path="/" component={Home} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />

          {/* admin routes */}
          <AdminRoute component={Dashboard} path="/admin" exact />
          <AdminRoute component={UserList} path="/admin/users" exact />
          <AdminRoute component={ProductList} path="/admin/products" exact />
          <AdminRoute component={OrderList} path="/admin/orders" exact />

          {/* not found route */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
