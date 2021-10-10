import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogged, isAdmin } from "../components/users/fetchActions";

export const LoggedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged() ? (
          <Component {...props} />
        ) : (
          (alert("You need to be logged!"), (<Redirect to="/login" />))
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
          (alert("You need to be admin!"), (<Redirect to="/login" />))
        )
      }
    />
  );
};
