import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Web.scss';
import { Link } from 'react-router-dom';

class Web extends Component {

render() {
  return (
      <div className="container-web">
        <div className="header">
          <div className="logo"></div>
          <div className="link-button">
            <Link
              to="/prelogin">
              INICIAR SESIÓN
            </Link>
          </div>
        </div>
        <div className="content-1">
          <div className="info">
            <h2>Conoce tu ciclo menstrual</h2>
            <p>La primera aplicación que te ayuda a entender cómo afecta el ciclo menstrual en tu salud y en tu cuidado personal.</p>
          </div>
          <div className="rectangle"></div>
        </div>
        <div className="content-2">
          <div className="info">
            <div className="text">
              <h3>Aprende a cuidarte</h3>
              <p>Recomendaciones adaptadas a tu ciclo, sobre 4 temas:</p>
              <ul>
                <li className="sport">Entrenamiento</li>
                <li className="food">Alimentación</li>
                <li className="health">Ánimo</li>
                <li className="sex">Sexualidad</li>
              </ul>
            </div>
            <div className="image-mobile"></div>
          </div>
        </div>
        <div className="content-3">
          <div className="info">
            <div className="image-mobilecicla"></div>
            <div className="text">
              <h3>Colaborativa</h3>
              <p>Comparte la información con otras personas para que sepan cómo estás cada día (entrenadores, parejas, familiares)</p> 
              <p>No podrán editar, pero sí conocer cómo te encuentras.</p>
            </div>
          </div>
        </div>
        <div className="content-4">
          <div className="rectangle"></div>
          <div className="info">
            <div className="text">
              <h2>¿Te gustaría formar parte?</h2>
              <p>Somos un grupo de personas que hacemos este proyecto en nuestro tiempo libre porque nos encanta la idea y creemos que puede ser realmente útil para las personas.</p>
              <div className="link-button">
                <Link
                  to='/login'>
                  ¡COLABORA CON NOSOTRAS!
                </Link>
              </div>    
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="policies">
            <div className="info">
              <p>Política de privacidad</p>
              <p>Aviso legal y condiciones generales</p>
            </div>
            <div className="contact">
              <p>Si tienes cualquier duda, comentario, sugerencia o si simplemente te apetece decirnos Hola! escríbenos a: hola@cicla.app</p>
            </div>
          </div>
          <div className="city">
            <p>Hecho con <span className="love"></span> por mujeres en Madrid</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Web;