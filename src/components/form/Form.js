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


  submitForm = event => {
    const { form } = this.props;
    event.preventDefault();

    form.validateFields((errors) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        authService.register(this.state.user)
        .then(
          (user) => this.setState({ authenticated: true }),
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
    return (
      <form onSubmit={this.submitForm}>
        <InputField
          type="email"
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
          type="default"
          htmlType="submit"
          size="large"
          {...(loading ? { loading } : null)}
        >
          Regístrate
        </Button>
      </form>
    );
  }
}

export default createForm()(Form);