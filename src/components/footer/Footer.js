import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Footer.scss';
import { Link } from 'react-router-dom';

class Footer extends Component {
render() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="info">
        <p>
          <Link to="/policies">Política de privacidad</Link> 
        </p>
        <p>
          <Link to="/conditions">Aviso legal y condiciones generales</Link>
        </p>
        </div>
        <div className="contact">
          <p>Si tienes cualquier duda, comentario, sugerencia o si simplemente te apetece decirnos Hola! escríbenos a: hola@cicla.app</p>
        </div>
      </div>
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