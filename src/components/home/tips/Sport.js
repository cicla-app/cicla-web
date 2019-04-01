import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './Sport.scss'
import { PageHeader, Icon } from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Sport extends React.Component {
  goBack(){
    history.goBack();
  }
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="ENTRENAMIENTO">
        </PageHeader>
        <div>
          <div className="subheader">
            <p className="date">19-03-2019</p>
            <p>Fase folicular media</p>
          </div>
          <div class="card">
            En esta fase tu fuerza puede llegar a aumentar un 11% Entre la regla y la ovulación es donde tienes que concentrar el trabajo de fuerza.
          </div>
          <div className="card">
            <ul>
              <li>
                <Icon type="right"></Icon>
                Entrenamientos de fuerza y potencia y Máxima intensidad y carga.</li>
              <li>
                <Icon type="right"></Icon>
                Más favorable al desarrollo y rendimiento de capacidades relacionadas con el rendimiento en resistencia</li>
              <li>
                <Icon type="right"></Icon>
                Sesiones fuertes: mejores resultados del entrenamiento y menos daño muscular</li>
              <li>
                <Icon type="right"></Icon>
                Incluye trabajos aeróbicos de baja intensidad y alto volumen</li>
              <li>
                <Icon type="right"></Icon>
                Fortalece el suelo pélvico con abdominales core, ejercicios de kegel e hipopresivos</li>
              <li>
                <Icon type="right"></Icon>
                Máximo una vez a la semana de abdominales clásicas, ya que dañan el suelo pélvico</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sport;