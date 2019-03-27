import React, { Component } from 'react';
import authService from '../../services/AuthService';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Login.scss';
import { Redirect } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Button
} from 'antd';

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}/;

const validators = {
  email: (value) => {
    let error;
    if (!value || value === '') {
      error = 'Email is required';
    } else if (!emailPattern.test(value)) {
      error = 'Invalid email format'; 
    }
    return error;
  },
  password: (value) => {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (!value.length >= 8) {
      error = 'Password must contains at least 8 characters';
    } else if (!passwordPattern.test(value)) {
      error = 'La contraseña debe contener';
    }
    return error;
  }
}

class Login extends Component {
  state = {
    step: 0,
    user: {
      email: '',
      password: ''
    },
    errors: {},
    touch: {},
    authenticated: false
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.hasErrors()) {
      authService.login(this.state.user)
      .then(
        (user) => {
          this.setState({ authenticated: true });
          this.props.onUserChange(user);
        },
        (error) => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
              password: message
            }
          })
        }
      )
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name] && validators[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  hasErrors = () => Object.keys(this.state.user)
    .some(attr => validators[attr] && validators[attr](this.state.user[attr]))

render() {
  const { touch, errors, user } = this.state;
  if (this.state.authenticated) {
    return (<Redirect to="/calendar" />);
  } else {
    return (
      <div>
        <h1>CICLA</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            size="large"
            className={`form-control ${touch.email && errors.email && 'is-invalid'} mb-2`}
            name="email"
            placeholder="Email"
            onChange={this.handleChange} value={user.email}
            onBlur={this.handleBlur} />
          <div className="invalid-feedback">{errors.email}</div>
          <Input
            type="password"
            size="large"
            className={`form-control ${touch.password && errors.password && 'is-invalid'} mb-2`}
            name="password"
            placeholder="Contraseña"
            onChange={this.handleChange}
            value={user.password}
            onBlur={this.handleBlur}/>
          <div className="invalid-feedback">{errors.password}</div>
          <Button
            block
            size="large"
            type="submit"
            disabled={this.hasErrors()}>Siguiente</Button>  
        </form>
      </div>
    );
    }
  }
}

export default withAuthConsumer(Login);