import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { Route, Redirect } from 'react-router-dom';
import { isLogged, isAdmin } from '../api/auth';

export function LoggedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (isLogged() ? (
        <Component {...props} />
      ) : (
        (toast.error('You need to be logged!'), (<Redirect to="/login" />))
      ))}
    />
  );
}

export function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (isAdmin() ? (
        <Component {...props} />
      ) : (
        (toast.error('You need to be admin!'), (<Redirect to="/" />))
      ))}
    />
  );
}

LoggedRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

AdminRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
