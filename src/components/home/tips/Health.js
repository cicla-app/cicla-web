import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './Tips.scss'
import { PageHeader, Icon } from 'antd';
import { createBrowserHistory } from 'history';
import Moment from 'react-moment';

const history = createBrowserHistory();

class Health extends React.Component {
  goBack(){
    history.goBack();
  }
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="ÁNIMO">
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
          Notarás cambios en el estado de ánimo, más tristeza o peor carácter además de un cansancio generalizado.
          </div>
          <div className="card">
            <ul>
              <li>
                <Icon type="right"></Icon>
                Debilidad muscular.</li>
              <li>
                <Icon type="right"></Icon>
                Tendencia a las caídas.</li>
              <li>
                <Icon type="right"></Icon>
                Cansancio general.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Health;