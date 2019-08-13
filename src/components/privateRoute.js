import React from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from '../utils/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/pro/login`) {
    // If the user is not logged in, redirect to the login page.
    navigate(`/pro/login`);
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
