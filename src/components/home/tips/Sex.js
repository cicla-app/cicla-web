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

class Sex extends React.Component {
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
            title="SEXUALIDAD">
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
              Comienza a aumentar el deseo sexual progresivamente.
            </div>
            <div className="card">
              <ul>
                <li>
                  <Icon type="right"></Icon>
                  Deseo sexual aumentando.</li>
              </ul>
              <div className="alert-contraceptives sport">
                <div className="title">
                  <Icon type="notification" />
                  <h5>Anticonceptivos hormonales:</h5>
                </div>
                <p>Las mujeres que recurren a este método anticonceptivo poseen su propio ciclo hormonal, ya que las pastillas bloquean la ovulación y por tanto crean un ciclo artificial específico y caracterizado por la ausencia de los "altibajos pasionales" que se dan entre las que responden al ciclo natural.</p>
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
            title="SEXUALIDAD">
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
              Comienza a aumentar el deseo sexual progresivamente.
            </div>
            <div className="card">
              <ul>
                <li>
                  <Icon type="right"></Icon>
                  Deseo sexual aumentando.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(withAuthConsumer(Sex));