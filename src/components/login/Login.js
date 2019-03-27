import React, { Component } from 'react';
import 'antd/dist/antd.css';
import "../../_variables.scss";
import "./Login.scss";
import Form from '../form/Form';
import { Link } from 'react-router-dom';
import {
  Divider
} from 'antd';

class Login extends Component {
  render() {
    return (
      <div className="container-login">
        <h1>CICLA</h1>
        <Form />
        <Link to="/register">Olvidé mi contraseña</Link>
        <Divider></Divider>
        <Link to="/register">Regístrate</Link>
      </div>
    );
  }
}

export default Login;