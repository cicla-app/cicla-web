import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './SelectSession.scss';
import '../../_variables.scss';
import { Link } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Row, Col, Icon } from 'antd';
import { Navbar } from 'react-bootstrap';
import Footer from '../footer/Footer';

class SelectSession extends Component {
render() {
  return (
    <div className="content">
      <div className="header">
        <Navbar expand="lg">
          <Navbar.Brand
            href="/"
            className="logo"></Navbar.Brand>
          <Link
            size="large"
            className="link-button"
            variant="outline-success"
            to='/'>
            <Icon
              type="close"
              style={{ fontSize: '28px' }} />
          </Link>
        </Navbar>
      </div>
      <div className="container-select">
        <Row>
          <Col>
            <h1>Crea una cuenta o inicia sesión</h1>
          </Col>
        </Row>
        <div>
          <div>
            <div className="link">
              <Link
                to="/login">
                INICIAR SESIÓN
              </Link>
            </div>
            <div className="link">
              <Link
                to="/register">
                CREAR CUENTA
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
  }
}

export default withAuthConsumer(SelectSession);