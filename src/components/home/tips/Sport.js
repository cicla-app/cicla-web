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

class Sport extends React.Component {
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
      return <Skeleton active />
    } else if(stagesData[getCurrentStage(date, this.state.period)].name === 'Fase folicular primaria') {
      periodClass.push('period');

      return (
        <div>
          <PageHeader
            onBack={() => this.goBack()} 
            title="ENTRENAMIENTO">
          </PageHeader>
          <div>
            <div className="subheader">
              <p className="date">
                <Moment format="DD-MM-YYYY">
                  { date }
                </Moment>
              </p>
              <p className={periodClass.join(' ')}>
              {stagesData[getCurrentStage(date, this.state.period)].name}
              </p>
            </div>
            <div className="card resume">
            {stagesData[getCurrentStage(date, this.state.period)].sport.resume1}
            </div>
            <div className="card">
              <ul>
                {stagesData[getCurrentStage(date, this.state.period)].sport.tips.map((tip, i) => (
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
                <p>Desde el punto de vista deportivo, su consumo provoca la disminución de algunas enzimas oxidativas (citocromo oxidasa y citrato mitocondrial).</p>
                <p>Además, podía menguar también el VO2 Máx (consumo de oxígeno máximo). Lo que conduce a una pérdida de rendimiento aeróbico y anaeróbico.</p>
              </div>
              }
          </div>
        </div>
      </div>
    );
    }
  }
}

export default withAuthConsumer(Sport);