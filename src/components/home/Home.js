import React  from 'react';
import authService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../../_variables.scss';
import './Home.scss';
import Days from'./Days';
import NavBar from '../menu/Menu';
import { Tabs, Modal } from 'antd';
import Calendar from 'react-calendar';
import DayInfo from '../day-info/DayInfo';

class Home extends React.Component {
  state = {
    activeTab: "1",
    user: {
      ...this.props.user,
    },
    step: 0,
    visible: false,
    date: new Date()
  };

  constructor(props) {
    super(props);
    this.selectedDay = this.selectedDay.bind(this);
    this.addDateHandleChange = this.addDateHandleChange.bind(this);
    this.subtractDateHandleChange = this.subtractDateHandleChange.bind(this);
    // this.handleRange = this.handleRange.bind(this)
  }

  componentDidMount() {
    authService.getPeriod(this.props.user.id)
      .then((response) =>
        this.setState({
          period: response[0].stages
        })
      );
   authService.getUser(this.state.user.id)
   .then(user => this.setState({user})
   )
 }

  addDateHandleChange = ( days ) => {
    const newDate = new Date( this.state.date.setDate(this.state.date.getDate() + days) );
    this.setState({
      date: newDate
    })
  }

  subtractDateHandleChange = ( days ) => {
    const newDate = new Date( this.state.date.setDate(this.state.date.getDate() - days) );
    this.setState({
      date: newDate
    });
  }

  selectedDay = (date) => {
    this.setState({
      date: date,
    });
  }

  handleClickDay = (dayClicked) => {
    console.log(dayClicked)
    this.showModal(dayClicked);
  }

  showModal = (dayClicked) => {
    this.setState({
      visible: true
    });
  };

  handleOk = (startPeriod) => {
    console.log(startPeriod);
    authService.createPeriod(this.state.user.id, this.state.user.startPeriod)
    this.setState({
      user: {
        ...this.state.user,
        startPeriod: startPeriod,
      },
      visible: false
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // handleRange(range) {
  //   this.setState({
  //     user: {
  //       ...this.state.user,
  //       startPeriod: range[0],
  //       endPeriod: range[1]
  //     },
  //   }, () => console.log(this.state.user))
  // }

  render() {
    const TabPane = Tabs.TabPane
    return (
      <div className="home-container">
        <NavBar></NavBar>
        <div className="content">
          <Tabs
            defaultActiveKey="1">
            <TabPane tab="Día" key="1">
            {this.state.period && (
              <Days
                selectedDay={this.selectedDay}
                subtractDateHandleChange={this.subtractDateHandleChange}
                addDateHandleChange={this.addDateHandleChange}
                day={this.state.date}
                period={this.state.period}>
              </Days>
              )}
              {this.state.period && (
                <DayInfo
                  selectedDay={this.state.date}
                  period={this.state.period}>
                </DayInfo>
              )}
            </TabPane>
            <TabPane
              tab="Mes"
              key="2">
              <p className="subtitle">Aquí puedes añadir nuevas fechas de tus reglas:</p>
              <Calendar
                onClickDay={this.handleClickDay}
                value={this.state.user.startPeriod}
                // selectRange
                // onChange={this.handleRange}
                />
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