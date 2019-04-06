import React, { Component } from 'react';
import authService from '../../services/AuthService';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Colaborator.scss';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Button, PageHeader, Input
} from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;

const validators = {
  colaborator: (value) => {
    let error;
    if (!value || value === '') {
      error = 'Email is required';
    } else if (!emailPattern.test(value)) {
      error = 'Invalid email format'; 
    }
    return error;
  }
}

class ColaboratorData extends Component {
  state = {
    user: {
      colaborator: '',
    },
    errors: {},
    touch: {},
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.hasErrors()) {
      authService.updateUser(this.state.user)
      .then(
        (user) => this.setState(user),
        (error) => {
          const { errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
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
    .some(attr => validators[attr] && validators[attr](this.state.user[attr], this.state.user))

  goBack(){
    history.goBack();
  }

  render() {
    const { touch, errors, user } = this.state;
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="COLABORADORES/AS">
          </PageHeader>
        <div className="container-colaborator">
          <p className="mt-3">Invita a otras personas para que conozcan de cerca los síntomas y efectos de tu ciclo menstrual en tu vida diaria.</p>
          <p>Escribe el mail de la persona y le mandaremos un enlace para que pueda descargarse y ver tus datos.</p>
          <p className="mt-3">Correo electrónico de colaborador/a:</p>
          <form onSubmit={this.onSubmit}>
            <Input
              type="text"
              size="large"
              className={`form-control ${touch.colaborator && errors.colaborator && 'is-invalid'} mb-2`}
              name="colaborator"
              placeholder="Email"
              onChange={this.handleChange}
              value={user.colaborator}
              onBlur={this.handleBlur} />
            <div className="invalid-feedback">{errors.colaborator}</div>
            <Button
              className="my-3"
              block
              size="large"
              htmlType="submit"
              disabled={this.hasErrors()}>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(ColaboratorData));