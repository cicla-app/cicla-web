import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/AuthService';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav
} from 'react-bootstrap';
import './Menu.scss';

class Menu extends Component {
  handleLogout = () => {
    authService.logout()
      .then(() => {
        const { history } = this.props;
        this.props.onUserChange({});
        history.push('/login');
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
            <Nav.Link href="/access-data">Datos de acceso</Nav.Link>
            <Nav.Link href="/cicle-data">Datos de tu ciclo</Nav.Link>
            <Nav.Link href="/colaborator-data">Colaboradores/as</Nav.Link>
            <Nav.Link href="#">Fases de la regla</Nav.Link>
            <Nav.Link href="#">Donaciones</Nav.Link>
            <Nav.Link href="/logout">Cerrar sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuthConsumer(withRouter(Menu))