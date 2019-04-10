import React, { Component } from 'react';
import AuthService from '../services/AuthService';

const USER_STORAGE_KEY = 'current-user';
const AuthContext = React.createContext();

class AuthStore extends Component {
  state = {
    user: JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}')
  }
  userSubscription = undefined;

  componentDidMount = () => {
    this.userSubscription = AuthService.onUserChange().subscribe(user =>
      this.setState({ user: user})
  )};

  componentWillUnmount() {
    this.userSubscription.unsubscribe();
  }

  handleUserChange = (user) => {
    this.setState({
      user: user
    })
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }

  isAuthenticated = () => {
    return this.state.user && this.state.user.email;
  }

  render() {
    return (
      <AuthContext.Provider 
        value={{ 
          user: this.state.user, 
          onUserChange: this.handleUserChange,
          isAuthenticated: this.isAuthenticated
        }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const withAuthConsumer = (Component) => {
  return (props) => (
    <AuthContext.Consumer>
      {(storeProps) => (<Component {...props} {...storeProps} />)}
    </AuthContext.Consumer>
  );
}

export { AuthStore, AuthContext, withAuthConsumer }