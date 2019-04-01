import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Prelogin.scss';
import '../../_variables.scss';
import { Link } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Row, Col } from 'antd';
import Header from '../header/Header';
import Footer from '../footer/Footer';

class Prelogin extends Component {
render() {
  return (
    <div>
      <div className="container-prelogin">
        <Header></Header>
        <Row>
          <Col>
            <h1>Crea una cuenta o inicia sesión</h1>
          </Col>
        </Row>
        <div>
          <div>
            {/* <form class="button-actions" action="/facebook" method="POST">
              <div className="facebook mb-3">
                <Button
                  size="large"
                  block
                  htmlType="submit">
                  FACEBOOK
                </Button>
              </div>
            </form>
            <div className="google">
              <Button
                size="large"
                block>
                GOOGLE
              </Button>
            </div> */}
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