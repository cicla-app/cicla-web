import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { withAuthConsumer } from '../../../contexts/AuthStore';
import './Tips.scss';
import { PageHeader, Icon, Skeleton } from 'antd';
import { createBrowserHistory } from 'history';
import Moment from 'react-moment';
import authService from '../../../services/AuthService';
import { getCurrentStage } from './../../../helpers/Helper';
import stagesData from './../../../data/stages.json';

const history = createBrowserHistory();

class Sex extends React.Component {
  state = {
    user: {
      ...this.props.user,
    },
    date: new Date(),
    period: {}
  };

  componentDidMount = () => {
    authService.getPeriod(this.props.user.id)
      .then((response) => {
        this.setState({
          period: response[0].stages
        })
      });

    authService.getUser(this.state.user.id)
      .then(user => this.setState({ user }));
}

  goBack(){
    history.goBack();
  }

  render() {
    const { date }  = this.props.match.params;
    const periodClass = ["stage"];

    if (Object.values(this.state.period).length === 0) {
      return  (
        <div className="container">
          <Skeleton active />
        </div>
      )
    } 
      return (
        <div>
          <PageHeader
            onBack={() => this.goBack()} 
            title="SEXUALIDAD">
          </PageHeader>
          <div>
          <div className="subheader">
            <p className="date">
              <Moment format="DD-MM-YYYY">
                { date }
              </Moment>
            </p>
            <div className="stage-info">
              <Icon type="info-circle" />
              <p className={periodClass.join(' ')}>
                {stagesData[getCurrentStage(date, this.state.period)].name}
              </p>
            </div>
          </div>
          <div className="card resume">
          {stagesData[getCurrentStage(date, this.state.period)].sex.resume3}
          </div>
          <div className="card">
            <ul>
              {stagesData[getCurrentStage(date, this.state.period)].sex.tips.map((tip, i) => (
                <li key={i}>
                  <Icon type="right"></Icon>
                  {tip}
                </li>
              ))}
            </ul>
            { this.state.user.contraceptives && 
              <div className="alert-contraceptives sport">
                <div className="title">
                  <Icon type="notification" />
                  <h5>Anticonceptivos hormonales:</h5>
                </div>
                <p>Las mujeres que recurren a este método anticonceptivo poseen su propio ciclo hormonal, ya que las pastillas bloquean la ovulación y por tanto crean un ciclo artificial específico y caracterizado por la ausencia de los "altibajos pasionales" que se dan entre las que responden al ciclo natural.</p>
              </div>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(Sex);