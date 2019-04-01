import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Footer.scss';
import {
  Row, Col
} from 'antd';

class Footer extends Component {
render() {
  return (
    <div className="footer-container">
      <Row>
        <Col>
          <div className="info">
            <p>Política de privacidad</p>
            <p>Aviso legal y condiciones generales</p>
          </div>
          <div className="contact">
            <p>Si tienes cualquier duda, comentario, sugerencia o si simplemente te apetece decirnos Hola! escríbenos a: hola@cicla.app</p>
          </div>
        </Col>
      </Row>
      <div className="corporative">
        <div>
          <p>Hecho con <span className="love"></span> por mujeres en Madrid</p>
        </div>
      </div>
    </div>
  );
  }
}

export default Footer;