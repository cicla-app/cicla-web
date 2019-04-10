import React from 'react'
import { withAuthConsumer } from '../contexts/AuthStore';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => {
  if (!isAuthenticated()) {
    return <Redirect to="/" />
  }
  return (
    <Route {...rest} component={Component} />
  )
}

export default withAuthConsumer(PrivateRoute)