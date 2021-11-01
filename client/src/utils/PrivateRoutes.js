import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogged, isAdmin } from "../components/users/fetchActions";
import { toast } from "react-toastify";

export const LoggedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged() ? (
          <Component {...props} />
        ) : (
          (toast.warn("You need to be logged!"), (<Redirect to="/login" />))
        )
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <Component {...props} />
        ) : (
          (toast.warn("You need to be admin!"), (<Redirect to="/" />))
        )
      }
    />
  );
};
