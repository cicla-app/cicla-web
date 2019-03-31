import React, { Component } from 'react';
import authService from '../../services/AuthService';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import { withAuthConsumer } from '../../contexts/AuthStore'
import {
  Button, PageHeader, Input, Row, Col
} from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;

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
}

class ModifyPassword extends Component {
  state = {
    user: {
      email:'',
    },
    errors: {},
    touch: {},
  };

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

  goBack(){
    history.goBack();
  }

  render() {
    const { touch, errors, user } = this.state;
    return (
      <div>
        <PageHeader
          title="REESTABLECER CONTRASEÑA"
          onBack={() => this.goBack()}>
        </PageHeader>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="mt-3">Introduce tu dirección de correo electrónico y te enviaremos los
              pasos que tienes que seguir</p>
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
              </form>
              <Button
                block
                size="large"
                className="mt-3"
                htmlType="submit"
                disabled={this.hasErrors()}>
                Enviar
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(ModifyPassword));