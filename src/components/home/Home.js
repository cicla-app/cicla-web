import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../../_variables.scss';
import './Home.scss';
import NavBar from '../menu/Menu';
import { Tabs, Pagination, Card, Collapse, Icon, Alert } from 'antd';
import Calendar from 'react-calendar';

class Home extends React.Component {
  state = {
    date: new Date(),
  }
  render() {
    const TabPane = Tabs.TabPane;
    const Panel = Collapse.Panel;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };
    return (
      <div>
        <NavBar></NavBar>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Día" key="1">
            <Pagination defaultCurrent={19} total={50} />
            <Card
              className="mt-2"
              title="Fase folicular primaria"
              bordered={false}>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                <Panel header="Entrenamiento" key="1" style={customPanelStyle}>
                  <p>En esta fase tu fuerza puede llegar a aumentar un 11%. 
                    Entre la regla y la ovulación es donde tienes que concentrar el trabajo de fuerza, 
                    tendrás mejores resultados y menos daño muscular</p>
                    <ul>
                      <li>Entrenamiento de fuerza y potencia</li>
                      <li>Máxima intensidad y carga</li>
                      <li>Más favorable el desarrollo y rendimiento de capacidades relacionadas con el rendimiento en resistencia</li>
                      <li>Incluye trabajos aeróbicos de baja intensidad y alto volumen</li>
                      <li>Intensifica los trabajos  sin lastre y tareas prolongadas</li>
                      <li>Fortalece el suelo pélvico con abdominales core, ejercicios de kegel e hipopresivos</li>
                    </ul>
                  <Alert
                    message="Cuidado"
                    description="Máximo una vez a la semana de abdominales clásicas, ya que dañan el suelo pélvico"
                    type="info"
                     />
                </Panel>
                <Panel header="Alimentación" key="2" style={customPanelStyle}>
                  <p>Alimentación</p>
                </Panel>
                <Panel header="Ánimo" key="3" style={customPanelStyle}>
                  <p>Ánimo</p>
                </Panel>
                <Panel header="Sexualidad" key="4" style={customPanelStyle}>
                  <p>Sexualidad</p>
                </Panel>
              </Collapse>
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