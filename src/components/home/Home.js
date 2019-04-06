import React  from 'react';
import authService from '../../services/AuthService';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../../_variables.scss';
import './Home.scss';
import { NavLink } from 'react-router-dom';
import Days from'./Days';
import NavBar from '../menu/Menu';
import { Tabs, Card, Icon } from 'antd';
import Calendar from 'react-calendar';

class Home extends React.Component {
  state = {
    user: {
      ...this.props.user,
      periodDays: '',
      cycleDays: '',
      contraceptives: false,
      startPeriod: ''
    },
    step: 0
  };

    handleStartDate = (startPeriod) => {
      console.log(startPeriod)
      authService.createPeriod(this.props.location.state.userId, startPeriod)
      this.setState({
        user: {
          ...this.state.user,
          startPeriod: startPeriod
        },
      })
    };

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div className="home-container">
        <NavBar></NavBar>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Día" key="1">
            <Days></Days>
            <Card>
              <div className="stage">
                <Icon type="info-circle" />
                <p>Fase folicular primaria</p>
              </div>
              <div className="card">
                <h4>Entrenamiento</h4>
                <p>En esta fase tu fuerza puede llegar a aumentar un 11%. 
                    Entre la regla y la ovulación es donde tienes que concentrar el trabajo de fuerza, 
                    tendrás mejores resultados y menos daño muscular</p>
                <NavLink to="/sport">
                  <Icon type="right" />
                </NavLink>
              </div>
              <div className="card">
                <h4>Alimentación</h4>
                <p>Alimentación</p>
                <NavLink to="/food">
                  <Icon type="right" />
                </NavLink>
              </div>
              <div className="card">
                <h4>Ánimo</h4>
                <p>Ánimo</p>
                <NavLink to="/health">
                  <Icon type="right" />
                </NavLink>
              </div>
              <div className="card">
                <h4>Sexualidad</h4>
                <p>Sexualidad</p>
                <NavLink to="/sex">
                  <Icon type="right" />
                </NavLink>
              </div>
            </Card>
          </TabPane>
          <TabPane tab="Mes" key="2">
            <p className="subtitle">Aquí puedes ver la predicción de tus ciclos y añadir los periodos:</p>
            <Calendar
              onClickDay={this.handleStartDate}
              value={this.state.startPeriod}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Home;