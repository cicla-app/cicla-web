import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { withAuthConsumer } from '../../../contexts/AuthStore';
import { withRouter } from 'react-router-dom';
import './Tips.scss';
import { PageHeader, Icon } from 'antd';
import { createBrowserHistory } from 'history';
import Moment from 'react-moment';

const history = createBrowserHistory();

class Sport extends React.Component {
  state = {
    user: {
      ...this.props.user,
    },
  };

  goBack(){
    history.goBack();
  }

  render() {
    const { user } = this.props;
    if (user.contraceptives === true) {
      return (
        <div>
          <PageHeader
            onBack={() => this.goBack()} 
            title="ENTRENAMIENTO">
          </PageHeader>
          <div>
            <div className="subheader">
              <p className="date">
                <Moment
                  format="DD-MM-YYYY">
                </Moment>
              </p>
              <p>Fase folicular primaria</p>
            </div>
            <div className="card">
              En esta fase tu fuerza puede llegar a aumentar un 11% Entre la regla y la ovulación es donde tienes que concentrar el trabajo de fuerza.
            </div>
            <div className="card">
              <ul>
                <li>
                  <Icon type="right"></Icon>
                  Entrenamientos de fuerza y potencia y Máxima intensidad y carga.</li>
                <li>
                  <Icon type="right"></Icon>
                  Más favorable al desarrollo y rendimiento de capacidades relacionadas con el rendimiento en resistencia.</li>
                <li>
                  <Icon type="right"></Icon>
                  Sesiones fuertes: mejores resultados del entrenamiento y menos daño muscular.</li>
                <li>
                  <Icon type="right"></Icon>
                  Incluye trabajos aeróbicos de baja intensidad y alto volumen.</li>
                <li>
                  <Icon type="right"></Icon>
                  Fortalece el suelo pélvico con abdominales core, ejercicios de kegel e hipopresivos.</li>
                <li>
                  <Icon type="right"></Icon>
                  Máximo una vez a la semana de abdominales clásicas, ya que dañan el suelo pélvico.</li>
              </ul>
              <div className="alert-contraceptives sport">
                <div className="title">
                  <Icon type="notification" />
                  <h5>Anticonceptivos hormonales:</h5>
                </div>
                <p>Desde el punto de vista deportivo, su consumo provoca la disminución de algunas enzimas oxidativas (citocromo oxidasa y citrato mitocondrial).</p>
                <p>Además, podía menguar también el VO2 Máx (consumo de oxígeno máximo). Lo que conduce a una pérdida de rendimiento aeróbico y anaeróbico.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <PageHeader
            onBack={() => this.goBack()} 
            title="ENTRENAMIENTO">
          </PageHeader>
          <div>
            <div className="subheader">
              <p className="date">
                <Moment
                  format="DD-MM-YYYY">
                </Moment>
              </p>
              <p>Fase folicular primaria</p>
            </div>
            <div className="card">
              En esta fase tu fuerza puede llegar a aumentar un 11% Entre la regla y la ovulación es donde tienes que concentrar el trabajo de fuerza.
            </div>
            <div className="card">
              <ul>
                <li>
                  <Icon type="right"></Icon>
                  Entrenamientos de fuerza y potencia y Máxima intensidad y carga.</li>
                <li>
                  <Icon type="right"></Icon>
                  Más favorable al desarrollo y rendimiento de capacidades relacionadas con el rendimiento en resistencia.</li>
                <li>
                  <Icon type="right"></Icon>
                  Sesiones fuertes: mejores resultados del entrenamiento y menos daño muscular.</li>
                <li>
                  <Icon type="right"></Icon>
                  Incluye trabajos aeróbicos de baja intensidad y alto volumen.</li>
                <li>
                  <Icon type="right"></Icon>
                  Fortalece el suelo pélvico con abdominales core, ejercicios de kegel e hipopresivos.</li>
                <li>
                  <Icon type="right"></Icon>
                  Máximo una vez a la semana de abdominales clásicas, ya que dañan el suelo pélvico.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(withAuthConsumer(Sport));