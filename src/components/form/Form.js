import React, { Component } from 'react';
import 'antd/dist/antd.css';
import "../../_variables.scss";
import { createForm } from '../../utils/createForm';
import InputField from './input/InputField';
import { Button } from 'antd';
import {
  checkEmail,
  checkBool,
  checkLength
} from '../../utils/validators';
import CheckboxField from './CheckboxField';
import authService from '../../services/AuthService';
import { Redirect } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';

class Form extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {},
    touch: {},
    authenticated: false
  };


  disabledButton() {
    const { getFieldError } = this.props.form;
    return getFieldError('email') || getFieldError('password') || getFieldError('acceptTerms');
  }

  submitForm = event => {
    const { form } = this.props;
    event.preventDefault();

    
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        authService.register(fields)
        .then(
          (user) => this.setState({ authenticated: true }),
          (error) => {
            const { message, errors } = error.response;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                password: message
              }
            })
          }
        )
        this.setState({ loading: true }, () => {
          setTimeout(() => {
            this.setState({ loading: false }, () => {
              form.resetFields();
            });
          }, 3000);
        });
      }
    });
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { hasPrivacyForm } = this.props;
    const { loading } = this.state;

    if (this.state.authenticated) {
      return (<Redirect to="/register" />);
    } else {
    return (
      <form onSubmit={this.submitForm}>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          allowClear
          {...getFieldProps('email', {
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true, validator: checkEmail }]
          })}
          errors={getFieldError('email')}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Contraseña"
          {...getFieldProps('password', {
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true, validator: checkLength }]
          })}
          errors={getFieldError('password')}
        />
        { hasPrivacyForm && <CheckboxField
          label="Acepto la política de privacidad y las condiciones del servicio"
          {...getFieldProps('acceptTerms', {
            valuePropName: 'checked',
            validateFirst: true,
            rules: [{ required: true, validator: checkBool }]
          })}
          errors={getFieldError('acceptTerms')}
        /> }
        <Button
          block
          disabled={ this.disabledButton() }
          type="default"
          htmlType="submit"
          size="large"
          className="mt-3"
          {...(loading ? { loading } : null)}>
          Entra
        </Button>
      </form>
    )};
  }
}

export default withAuthConsumer(createForm()(Form));
