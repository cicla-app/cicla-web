import React, { Component } from 'react';

const USER_STORAGE_KEY = 'current-user';
const AuthContext = React.createContext();

class AuthStore extends Component {
  state = {
    user: JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}')
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
  return () => (
    <AuthContext.Consumer>
      {(props) => (<Component {...props} />)}
    </AuthContext.Consumer>
  );
}

export { AuthStore, AuthContext, withAuthConsumer }