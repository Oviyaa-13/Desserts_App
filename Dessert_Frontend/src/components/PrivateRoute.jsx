import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role, ...rest }) => {
  const user = useSelector(state => state.user); // Adjust this based on your state structure

  if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    // Redirect to home if the user does not have the right role
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

