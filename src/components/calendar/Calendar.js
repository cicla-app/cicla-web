import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../../_variables.scss';
import './Calendar.scss';
import MenuNav from '../menu/Menu';
import { Tabs, Pagination, Card, Collapse, Icon } from 'antd';

class Calendar extends React.Component {
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
        <MenuNav></MenuNav>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Día" key="1">
            <Pagination defaultCurrent={19} total={50} />
            <Card
              className="mt-2"
              title="Fase folicular"
              bordered={false}
              style={{ width: 300 }}>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                <Panel header="Entrenamiento" key="1" style={customPanelStyle}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat quis orci ut tempus. Nunc erat est, ornare sed ipsum sit amet, feugiat cursus nibh.</p>
                    <ul>
                      <li>Etiam quis purus bibendum, tincidunt quam vel, finibus turpis. </li>
                      <li>Proin consequat, orci in sagittis sodales, massa dolor consectetur ligula, ut bibendum justo ante quis sapien. </li>
                      <li>Nunc orci risus, eleifend eget sem eget, malesuada placerat eros.</li>
                      <li>Nulla facilisi. Vivamus sed varius mi.</li>
                    </ul>
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
          <TabPane tab="Mes" key="2">Mes</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Calendar;