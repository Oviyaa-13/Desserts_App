import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  return (
    <Route
      {...rest}
      render={(props) =>
        role === 'admin' ? <Component {...props} /> : <Redirect to="/products" />
      }
    />
  );
};

export default AdminRoute;
