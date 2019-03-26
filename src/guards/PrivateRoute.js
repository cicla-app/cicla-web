import React from 'react'
import { AuthContext } from '../contexts/AuthStore';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <AuthContext.Consumer>
    {({isAuthenticated}) => (
      <Route render={(props) =>
        isAuthenticated() ?
          <Component {...props} /> :
          <Redirect to="/login" />
      } {...rest} />
    )}
  </AuthContext.Consumer>
  
);

export default PrivateRoute