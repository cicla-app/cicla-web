import React  from 'react';
import authService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { withRouter, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../../_variables.scss';
import './Home.scss';
import Days from'./Days';
import NavBar from '../menu/Menu';
import { Tabs, Modal } from 'antd';
import Calendar from 'react-calendar';
import DayInfo from '../day-info/DayInfo';
import Footer from '../footer/Footer';

class Home extends React.Component {
  state = {
    activeTab: "1",
    user: {
      ...this.props.user,
      startPeriod: ''
    },
    step: 0,
    visible: false,
    dayClicked: null,
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
      .then((response) => {
        if(response.length === 0) {
          this.setState({
            toOnboarding: true
          })
        } else {
          this.setState({
            startPeriod: response[0].startPeriod,
            period: response[0].stages
          })
          authService.getUser(this.state.user.id)
            .then(user => this.setState({user}))
        }
      });
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
      visible: true,
      dayClicked
    });
  };

  handleOk = (startPeriod) => {
    console.log(startPeriod);
    authService.createPeriod(this.state.user.id, this.state.dayClicked)
      .then(() => {
        this.setState({
          visible: false
        })
      })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const TabPane = Tabs.TabPane

    if(this.state.toOnboarding) {
      return <Redirect to='/onboarding' />
    }
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
                period={this.state.period}
                userId={this.props.user.id}>
              </Days>
              )}
              {this.state.period && (
                <DayInfo
                  selectedDay={this.state.date}
                  period={this.state.period}>
                </DayInfo>
              )}
              <Footer></Footer>
            </TabPane>
            <TabPane
              tab="Mes"
              key="2">
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
                <Footer></Footer>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(Home));