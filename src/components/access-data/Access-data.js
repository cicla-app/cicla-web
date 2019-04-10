import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Access-data.scss';
import { withRouter } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, PageHeader, Button
} from 'antd';
import { createBrowserHistory } from 'history';
import authService from '../../services/AuthService'

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
  userSubscription = undefined;

  componentDidMount = () => {
    this.userSubscription = authService.onUserChange().subscribe(user =>
      this.setState({ user: user})
  )};

  componentWillUnmount() {
    this.userSubscription.unsubscribe();
  }

  goBack(){
    history.goBack();
  }

  updateUser = () => {
    const newUser = {
      ...this.state.user
    }
    authService.updateUser(newUser);
    this.setState({
      user: newUser
    })
  }

  deleteUser = () => {
    authService.deleteUser(this.props.user.id)
    .then(() => {
      const { history } = this.props;
      this.props.onUserChange({});
      history.push('/select');
    })
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
          title="DATOS DE ACCESO">
        </PageHeader>
        <div className="container-data">
          <div>
            <form onSubmit={this.onSubmit}>
              <p>Modifica tu nombre:</p>
              <Input
                type="text"
                size="large"
                className='mb-3'
                name="alias"
                placeholder={user.alias}
                onChange={this.handleChange}
                value={user.alias}
                onBlur={this.handleBlur} />
              <p>Modifica tu email:</p>
              <Input
                type="text"
                size="large"
                className='mb-3'
                name="email"
                placeholder={user.email}
                onChange={this.handleChange}
                value={user.email}
                onBlur={this.handleBlur}/>
              {/* <div className="link-modify">
                <Link
                  to="/modify-password">Cambia tu contraseña
                </Link>
              </div> */}
              <Button
                block
                size="large"
                onClick={this.updateUser}>
                Guardar
              </Button>
            </form>
            <form>
              <p>¿Quieres eliminar tu cuenta?</p>
              <p>Al hacer click en el siguiente botón se borrarán todos tus datos</p>
              <Button
                block
                className="delete-button"
                size="large"
                onClick={this.deleteUser}>
                Eliminar mi cuenta
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(AccessData));