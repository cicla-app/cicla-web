import React  from 'react';
import authService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../../_variables.scss';
import './Home.scss';
import { NavLink } from 'react-router-dom';
import Days from'./Days';
import NavBar from '../menu/Menu';
import { Tabs, Card, Icon, Modal } from 'antd';
import Calendar from 'react-calendar';

class Home extends React.Component {
  state = {
    activeTab: "1",
    user: {
      ...this.props.user,
    },
    step: 0,
    visible: false
  };

  componentDidMount() {   
    authService.getPeriod(this.props.user.id)
      .then((response) =>
        this.setState({
          user: {
            ...this.state.user,
            response
          }
        })
      )}

    showModal = () => {
      this.setState({
        visible: true,
      });
    }

    handleOk = (startPeriod) => {
      // authService.createPeriod(this.props.user.id, startPeriod)
      // console.log('PERIODO:',startPeriod)
      this.setState({
        // user: {
        //   ...this.state.user,
        //   startPeriod: startPeriod,
        // },
        visible: false
      });
    }

    handleCancel = () => {
      this.setState({
        visible: false,
      });
    }

    // selectRange = (startPeriod, endPeriod) => {
    //   return false;
    // };

    // showTitle = () => {
    //   const stages = this.state.user.response.map(stages => <p>{stages}</p>)
    // }

  render() {
    const TabPane = Tabs.TabPane;
    console.log(this.state.user.response)
    return (
      <div className="home-container">
        <NavBar></NavBar>
        <div className="content">
          <Tabs
            defaultActiveKey="1">
            <TabPane tab="Día" key="1">
              <Days></Days>
              <Card>
                <div className="stage">
                  <Icon type="info-circle" />
                  <p>title</p>
                </div>
                <div className="card">
                  <h4>Entrenamiento</h4>
                  <p>En esta fase tu fuerza puede llegar a aumentar un 11%. 
                      Entre la regla y la ovulación es donde tienes que concentrar el trabajo de fuerza, 
                      tendrás mejores resultados y menos daño muscular</p>
                  <NavLink
                    to={{
                      pathname: '/sport',
                      state: {
                        user: this.state
                        }
                      }}>
                    <Icon type="right" />
                  </NavLink>
                </div>
                <div className="card">
                  <h4>Alimentación</h4>
                  <p>Necesitas un mayor aporte de hierro, ya que durante la menstruación se pierden de 18 a 24mg de hierro al día.</p>
                  <NavLink 
                    to={{
                      pathname: '/food',
                      state: {
                        user: this.state
                        }
                      }}>
                    <Icon type="right" />
                  </NavLink>
                </div>
                <div className="card">
                  <h4>Ánimo</h4>
                  <p>Notarás cambios en el estado de ánimo, más tristeza o peor carácter además de un cansancio generalizado.</p>
                  <NavLink 
                    to={{
                      pathname: '/health',
                      state: {
                        user: this.state
                        }
                      }}>
                    <Icon type="right" />
                  </NavLink>
                </div>
                <div className="card">
                  <h4>Sexualidad</h4>
                  <p>Comienza a aumentar el deseo sexual progresivamente.</p>
                  <NavLink 
                    to={{
                      pathname: '/sex',
                      state: {
                        user: this.state
                        }
                      }}>
                    <Icon type="right" />
                  </NavLink>
                </div>
              </Card>
            </TabPane>
            <TabPane
              tab="Mes"
              key="2">
              <p className="subtitle">Aquí puedes añadir nuevas fechas de tus reglas:</p>
              <Calendar
                // selectRange={this.selectRange}
                onClickDay={this.showModal}
                value={this.state.startPeriod}/>
                <Modal
                  title="AÑADIR NUEVO INICIO DE REGLA"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  okText="VALE"
                  cancelText="CANCELAR">
                  <p>¿Quieres añadir esta fecha como inicio de la regla?</p>
                </Modal>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(Home));