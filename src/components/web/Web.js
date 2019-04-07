import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Web.scss';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import Logo from '../header/Logo'

class Web extends Component {
render() {
  return (
      <div className="container-web">
        <Logo></Logo>
        <div className="content-1">
          <div className="info">
            <h2>Conoce tu ciclo menstrual para cuidarte y ganar en bienestar.</h2>
            <p>La primera aplicación que te ayuda a entender las diferentes sensaciones, emociones, pensamientos y cambios físicos que experimentas cada mes.</p>
            <div className="link-button">
              <Link
                to="/select">
                COMIENZA A USARLA
              </Link>
            </div>
          </div>
          <div className="rectangle"></div>
        </div>
        <div className="content-2">
          <div className="info">
            <div className="text">
              <h3>Pon a tu cuerpo de tu lado.</h3>
              <p>Cicla te acompaña anticipándose a los cambios que atraviesas durante el mes. Siéntete en armonía con tu cuerpo con recomendaciones diarias sobre:</p>
              <ul>
                <li className="sport">Tu entrenamiento</li>
                <li className="food">Tu alimentación</li>
                <li className="health">Tu ánimo</li>
                <li className="sex">Tu sexualidad</li>
              </ul>
            </div>
            <div className="image-mobile"></div>
          </div>
        </div>
        <div className="content-3">
          <div className="info">
            <div className="text">
              <h3>Mucho más útil que contárselo a una amiga.</h3>
              <p>Comparte la información con tu entrenador, pareja o familiares para que tengan una perspectiva real de cómo te sientes.</p> 
            </div>
          </div>
        </div>
        <div className="content-4">
          <div className="info">
            <div className="text">
              <h2>¿Te gustaría colaborar?</h2>
              <p className="pb-2">Este proyecto lo desarrollamos un grupo de mujeres en nuestro tiempo libre. Tenemos una visión real y sin prejuicios sobre nuestro cuerpo y creemos que  compartirla con el mundo será realmente útil. Si piensas como nosotras, llegaremos mucho más lejos con tu ayuda.</p>
              <div className="link-button small">
                <Link
                  to='/login'>
                  COLABORA CON NOSOTRAS
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

export default Web;