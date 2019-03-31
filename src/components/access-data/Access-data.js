import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import { Link, withRouter } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Row, Col, PageHeader, Button
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
      error = 'La contraseña debe contener';
    }
    return error;
  }
}

class AccessData extends Component {
  state = {
    user: {
      email: '',
      alias:''
    },
  };

  goBack(){
    history.goBack();
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

render() {
  const { user } = this.state;
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}
          title="Datos de acceso">
        </PageHeader>
        <Row className="mt-3">
          <Col span={20} offset={2}>
            <form onSubmit={this.onSubmit}>
              <Input
                type="text"
                size="large"
                className='mb-2'
                name="name"
                placeholder="Nombre"
                onChange={this.handleChange}
                value={user.name}
                onBlur={this.handleBlur} />
              <Input
                type="text"
                size="large"
                className='mb-2'
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={user.email}
                onBlur={this.handleBlur}/>
              <Link
                className="my-3"
                to="/access-data">Cambiar contraseña</Link>
              <Button
                className="my-3"
                block
                size="large"
                htmlType="submit">
                Guardar
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(AccessData));