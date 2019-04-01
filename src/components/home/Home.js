import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../../_variables.scss';
import './Home.scss';
import Days from'./Days';
import NavBar from '../menu/Menu';
import { Tabs, Card, Icon } from 'antd';
import Calendar from 'react-calendar';
import NavLink from 'react-bootstrap/NavLink';

class Home extends React.Component {
  state = {
    date: new Date(),
  }
  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div className="home-container">
        <NavBar></NavBar>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Día" key="1">
            <Days></Days>
            <Card className="mt-2">
              <div className="stage">
                <Icon type="info-circle" />
                <p>Fase folicular primaria</p>
              </div>
              <div className="my-3">
                <Card
                  title="Entrenamiento"
                  extra={<a href="/sport"><Icon type="right" /></a>}
                  style={{ width: 300 }}>
                  <p>En esta fase tu fuerza puede llegar a aumentar un 11%. 
                      Entre la regla y la ovulación es donde tienes que concentrar el trabajo de fuerza, 
                      tendrás mejores resultados y menos daño muscular</p>
                </Card>
              </div>
              <div>
                <Card
                  title="Alimentación"
                  extra={<a href="/food"><Icon type="right" /></a>}
                  style={{ width: 300 }}>
                  <p>Alimentación</p>
                </Card>
              </div>
              <div className="my-3">
                <Card
                  title="Ánimo"
                  extra={<a href="/health"><Icon type="right" /></a>}
                  style={{ width: 300 }}>
                  <p>Ánimo</p>
                </Card>
              </div>
              <div>
                <Card
                  title="Sexualidad"
                  extra={<NavLink href="/sex"><Icon type="right" /></NavLink>}
                  style={{ width: 300 }}>
                  <p>Sexualidad</p>
                </Card>
              </div>
            </Card>
          </TabPane>
          <TabPane tab="Mes" key="2">
            <Calendar
              onChange={this.onChange}
              value={this.state.date}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Home;