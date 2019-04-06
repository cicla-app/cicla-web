import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Prelogin.scss';
import '../../_variables.scss';
import { Link } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Row, Col } from 'antd';
import Footer from '../footer/Footer';
import Logo from '../header/Logo';

class Prelogin extends Component {
render() {
  return (
    <div>
      <Logo></Logo>
      <div className="container-prelogin">
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

export default withAuthConsumer(Prelogin);