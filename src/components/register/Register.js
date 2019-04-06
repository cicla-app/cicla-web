import React, { Component } from 'react';
import authService from '../../services/AuthService';
import { withRouter, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Register.scss';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Button, Switch, Row, Col
} from 'antd';
import Footer from '../footer/Footer';
import { createBrowserHistory } from 'history';
import Header from '../header/Header';
import Logo from '../header/Logo';

const history = createBrowserHistory();

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}/;

const validators = {
  email: (value) => {
    let error;
    if (!value || value === '') {
      error = 'Email es obligatorio';
    } else if (!emailPattern.test(value)) {
      error = 'Formato de email inválido'; 
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
      error = 'La contraseña debe contener caracteres y mayúsculas';
    }
    return error;
  },
  confirmPassword: (value, user) => value !== user.password ? 'Las contraseñas tienen que coincidir' : undefined,
  alias: (value) => !value ? 'Requerido' : undefined,
  acceptTerms: (value) => !value ? 'Requerido' : undefined
}

class Register extends Component {
  state = {
    step: 0,
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      alias: '',
      acceptTerms: false
    },
    errors: {},
    touch: {},
    authenticated: false
  };

  clickhandle = step => {
    this.setState( { step: step } );
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.hasErrors()) {
      authService.register(this.state.user)
      .then(
        (user) => {
          this.setState({ step: 1 }, 
            );
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
        [name]: validators[name] && validators[name](value, this.state.user)
      }
    })
  }

  handleToggleAcceptTerms = () => {
    const value = !this.state.user.acceptTerms;
    this.setState({
      user: {
        ...this.state.user,
        acceptTerms: value
      },
      errors: {
        ...this.state.errors,
        acceptTerms: validators['acceptTerms'] && validators['acceptTerms'](value)
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
    .some(attr => validators[attr] && validators[attr](this.state.user[attr], this.state.user))
  
  goBack(){
    history.goBack();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.step === 0 && this.renderStep1()}
        {this.state.step === 1 && this.renderStep2()}
      </form>
    )
  }

  renderStep1() {
    const { touch, errors } = this.state;
    return (
      <div>
        <div className="container-register">
          <Header></Header>
          <Row>
            <Col>
              <h1>Crea una cuenta</h1>
            </Col>
          </Row>
          <Input
            type="text"
            size="large"
            className={`form-control ${touch.email && errors.email && 'is-invalid'} mt-3 mb-2`}
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.user.email}
            onBlur={this.handleBlur} />
          <div className="invalid-feedback">{errors.email}</div>
          <Input.Password
            type="password"
            size="large"
            className={`form-control ${touch.password && errors.password && 'is-invalid'} my-2`}
            name="password"
            placeholder="Contraseña"
            onChange={this.handleChange}
            value={this.state.user.password}
            onBlur={this.handleBlur}/>
          <div className="invalid-feedback">{errors.password}</div>
          <Input.Password
            type="password"
            size="large"
            className={`form-control ${touch.confirmPassword && errors.confirmPassword && 'is-invalid'} mb-2`}
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            onChange={this.handleChange}
            onBlur={this.handleBlur}/>
          <div className="invalid-feedback">{errors.confirmPassword}</div>
          <Input
            required
            className="my-2"
            size="large"
            placeholder="Tu nombre o alias"
            type="text"
            name="alias"
            onChange={this.handleChange}
            value={this.state.user.alias}
            onBlur={this.handleBlur}>
          </Input>
          <div className="conditions">
            <Switch
              defaultChecked
              className="mt-3"
              name="acceptTerms"
              onChange={this.handleToggleAcceptTerms}
              checked={this.state.user.acceptTerms}>
            </Switch>
            <p className="ml-2">Acepto la 
              <Link to="/policies"> política de privacidad</Link> y las 
              <Link to="/conditions"> condiciones del servicio</Link></p>
          </div>
          <Button
            block
            size="large"
            className="link mt-2"
            htmlType="submit"
            disabled={this.hasErrors()}>CONTINUAR
          </Button>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  renderStep2() {
    const {user} = this.state;
    return (
      <div>
        <div>
          <Logo></Logo>
          <div className="container-register-step2">
            <h1>Confirma tu cuenta</h1>
            <p className="mt-3">Hemos enviado un mail a la dirección:</p>
            <p className="email">{user.email}</p>
            <p className="my-3">Sigue las instrucciones para verificar tu cuenta.</p>
            <p className="mb-3">¿No te ha llegado el mail? Escríbenos a hola@cicla.app</p>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(Register));