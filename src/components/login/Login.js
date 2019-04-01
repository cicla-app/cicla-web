import React, { Component } from 'react';
import authService from '../../services/AuthService';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Login.scss';
import { Redirect, Link } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Button, Row, Col, PageHeader
} from 'antd';
import Footer from '../footer/Footer';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}/;

const validators = {
  email: (value) => {
    let error;
    if (!value || value === '') {
      error = 'Email is required';
    } else if (!emailPattern.test(value)) {
      error = 'Formato de correo electrónico incorrecto'; 
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
      error = 'La contraseña debe contener al menos 8 caracteres';
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
          this.setState({ authenticated: true }, () => this.props.onUserChange(user)
          );
          history.push('/home');
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
  
    goBack(){
    history.goBack();
  }

render() {
  const { touch, errors, user } = this.state;
  if (this.state.authenticated) {
    return (<Redirect to="/home" />);
  } else {
    return (
      <div>
        <div className="container-login">
          <PageHeader
            onBack={() => this.goBack()} 
            title="INICIAR SESIÓN">
          </PageHeader>
          <Row>
            <Col>
              <h1>Inicia sesión</h1>
            </Col>
          </Row>
          <form onSubmit={this.onSubmit}>
            <div className="mb-3">
              <Input
                type="text"
                size="large"
                className={`form-control ${touch.email && errors.email && 'is-invalid'}`}
                name="email"
                placeholder="Correo electrónico"
                onChange={this.handleChange} value={user.email}
                onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="my-3">
              <Input.Password
                type="password"
                size="large"
                className={`form-control ${touch.password && errors.password && 'is-invalid'}`}
                name="password"
                placeholder="Contraseña"
                onChange={this.handleChange}
                value={user.password}
                onBlur={this.handleBlur}/>
              <div className="invalid-feedback mt-1">{errors.password}</div>
            </div>
            <div className="password my-3">
              <Link
                to="/modify-password">
                OLVIDÉ MI CONTRASEÑA
              </Link>
            </div>
            <Button
              block
              size="large"
              htmlType="submit"
              className="my-3"
              disabled={this.hasErrors()}>ENTRA</Button>
          </form>
        </div>
      <Footer></Footer>
    </div>
    );
    }
  }
}

export default withAuthConsumer(Login);