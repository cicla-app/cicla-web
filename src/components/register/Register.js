import React, { Component } from 'react';
import authService from '../../services/AuthService';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Register.scss';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Button, Switch, PageHeader, Row, Col, notification
} from 'antd';
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
      error = 'La contraseña debe contener caracteres y mayúsculas';
    }
    return error;
  },
  confirmPassword: (value, user) => {
    return value !== user.password ? 'Las contraseñas tienen que coincidir' : undefined
  }
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
    acceptTerms: false,
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
        (user) => this.setState({ step: 2 }),
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
  
    render() {
      return (
        <form onSubmit={this.onSubmit}>
          {this.state.step === 0 && this.renderStep1()}
          {this.state.step === 1 && this.renderStep2()}
          {this.state.step === 2 && this.renderStep3()}
        </form>
      )
  }
  goBack(){
    history.goBack();
  }

  renderStep1() {
    const { touch, errors, user } = this.state;
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="CREAR CUENTA">
        </PageHeader>
        <div className="container-register">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle">Introduce tus datos para acceder a la aplicación</p>
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2}>
              <Input
                type="text"
                size="large"
                className={`form-control ${touch.email && errors.email && 'is-invalid'} mb-2`}
                name="email"
                placeholder="Email"
                onChange={this.handleChange} value={user.email}
                onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.email}</div>
              <Input.Password
                type="password"
                size="large"
                className={`form-control ${touch.password && errors.password && 'is-invalid'} my-3`}
                name="password"
                placeholder="Contraseña"
                onChange={this.handleChange}
                value={user.password}
                onBlur={this.handleBlur}/>
              <div className="invalid-feedback">{errors.password}</div>
              <Input.Password
                type="password"
                size="large"
                className={`form-control ${touch.confirmPassword && errors.confirmPassword && 'is-invalid'} my-2`}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                onChange={this.handleChange}
                onBlur={this.handleBlur}/>
              <div className="invalid-feedback">{errors.confirmPassword}</div>
              <Button
                block
                size="large"
                className="mt-3"
                onClick={() => this.clickhandle( 1 )}
                disabled={this.hasErrors()}>Siguiente</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  toggleAcceptTerms = (acceptTerms) => {
    this.setState({
      acceptTerms
    })
  }

  renderStep2() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="CREAR CUENTA">
        </PageHeader>
        <div className="container-register">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle">Introduce el nombre con el que quieras que nos refiramos a ti</p>
              <Input
                required
                className="mb-2"
                size="large"
                placeholder="Nombre"
                type="text"
                name="alias"
                onChange={this.handleChange}
                value={this.state.user.alias}
                onBlur={this.handleBlur}>
              </Input>
            </Col>
          </Row>
          <Row className="my-1">
            <Col span={20} offset={2}>
              <Row>
                <Col span={4}>
                  <Switch
                    name="acceptTerms"
                    onChange={this.toggleAcceptTerms}
                    checked={this.state.acceptTerms}
                    >
                  </Switch>
                </Col>
                <Col span={20}>
                  <p>Acepto la política de privacidad y las condiciones del servicio</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{width: '100%'}}>
            <Col span={20} offset={2}>
              <Button
                block
                size="large"
                disabled={!this.state.acceptTerms}
                htmlType="submit">
                Enviar
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderStep3() {
    const {user} = this.state;

    const openNotification = () => {
      notification.open({
        message: '¡Hecho!',
        description: 'Hemos reenviado el mail de confirmación, si no lo ves en tu bandeja de entrada revisa la carpeta de Spam.',
        onClick: () => {},
      });
    };
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="CREAR CUENTA">
          </PageHeader>
        <div className="container-register">
          <p className="mt-3">Confirma tu e-mail</p>
          <p>Hemos enviado un mail a la dirección:</p>
          <p>{user.mail}</p>
          <p className="mb-3">Sigue las instrucciones para verificar tu cuenta.</p>
          <p className="mt-3">¿No te ha llegado mail?</p>
          <Button
            block
            size="large"
            onClick={openNotification}>
            Reenviar mail de confirmación
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(Register));