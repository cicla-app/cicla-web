import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/AuthService';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './Menu.scss';

class Menu extends Component {
  handleLogout = () => {
    authService.logout()
      .then(() => {
        const { history } = this.props;
        this.props.onUserChange({});
        history.push('/select');
      })
  }

  render() {
    const {user} = this.props;
    return (
      <Navbar expand="lg">
        <Navbar.Brand>¡Hola, {user.alias}!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              className="my-2"
              to="/access">
              Datos de acceso
            </NavLink>
            <NavLink
              className="my-2"
              to="/cicle">
              Datos de tu ciclo
            </NavLink>
            <NavLink
              className="my-2"
              to="/colaborator">
              Colaboradores/as
            </NavLink>
            <NavLink
              className="my-2"
              to="/donation">
              Donaciones
            </NavLink>
            <button
              className="my-2 button-menu"
              onClick={this.handleLogout}>
              Cerrar sesión
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuthConsumer(withRouter(Menu))