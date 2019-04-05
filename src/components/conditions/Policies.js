import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import { withRouter } from 'react-router-dom';
import {
  PageHeader
} from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Policies extends Component {
  goBack(){
    history.goBack();
  }

  render() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}
          title="Política de privacidad">
        </PageHeader>
        <p className="mt-3">POLÍTICA DE PRIVACIDAD DEL SITIO WEB</p>
        <p>www.cicla.app</p>
        <p>1. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</p>
        <p>Respetando lo establecido en la legislación vigente, CICLA (en adelante, también Sitio Web) se
          compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad
          adecuado al riesgo de los datos recogidos.
        </p>
        <p>Leyes que incorpora esta política de privacidad</p>
        <p>Esta política de privacidad está adaptada a la normativa española y europea vigente en materia de
          protección de datos personales en internet. En concreto, la misma respeta las siguientes normas:
        </p>
        <ul>
          <li>
          La Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de
          los derechos digitales.
          </li>
          <li>
          El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016,
          relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos
          personales y a la libre circulación de estos datos (RGPD).
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Policies);