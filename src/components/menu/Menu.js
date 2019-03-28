import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/login">CICLA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Datos de acceso</Nav.Link>
            <Nav.Link href="#">Datos de tu ciclo</Nav.Link>
            <Nav.Link href="#">Colaboradores/as</Nav.Link>
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