import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/AuthService';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav
} from 'react-bootstrap';
import './Menu.scss';

class Menu extends Component {
  handleLogout = () => {
    authService.logout()
      .then(() => {
        const { history } = this.props;
        this.props.onUserChange({});
        history.push('/home');
      })
  }

  render() {
    const {user} = this.props;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>{user.alias}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/access-data">Datos de acceso</NavLink>
            <NavLink to="/cicle-data">Datos de tu ciclo</NavLink>
            {/* <NavLink href="/colaborator-data">Colaboradores/as</NavLink>
            <NavLink href="#">Fases de la regla</NavLink>
            <NavLink href="#">Donaciones</NavLink> */}
            <button onClick={this.handleLogout}>Cerrar sesión</button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuthConsumer(withRouter(Menu))