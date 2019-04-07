import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './Tips.scss'
import { PageHeader, Icon } from 'antd';
import { createBrowserHistory } from 'history';
import Moment from 'react-moment';

const history = createBrowserHistory();

class Food extends React.Component {
  goBack(){
    history.goBack();
  }
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="ALIMENTACIÓN">
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
            Necesitas un mayor aporte de hierro, ya que durante la menstruación se pierden de 18 a 24mg de hierro al día.
          </div>
          <div className="card">
            <ul>
              <li>
                <Icon type="right"></Icon>
                Aumento de peso.</li>
              <li>
                <Icon type="right"></Icon>
                Comidas ligeras.</li>
              <li>
                <Icon type="right"></Icon>
                Bajar la cantidad de sal.</li>
              <li>
                <Icon type="right"></Icon>
                Mayor ingesta de calcio.</li>
              <li>
                <Icon type="right"></Icon>
                Mayor importancia del aporte de vitamina D.</li>
              <li>
                <Icon type="right"></Icon>
                Aumenta la ingesta de ácido fólico.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Food;