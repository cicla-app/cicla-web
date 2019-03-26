import React, { Component } from 'react';
import 'antd/dist/antd.css';
import "../../_variables.scss";
import Form from '../form/Form';


class Register extends Component {
  render() {
    return (
      <div>
        <Form hasPrivacyForm />
      </div>
    );
  }
}

export default Register;
