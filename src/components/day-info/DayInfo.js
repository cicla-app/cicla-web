import React from 'react';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../home/Home.scss';
import stagesData from '../../data/stages.json';
import moment from 'moment';
import { getCurrentStage } from './../../helpers/Helper';


const DayInfo = ({ selectedDay, period }) => {

  const currentStage = getCurrentStage(selectedDay, period);

  const periodClass = ["stage"];

  if(stagesData[currentStage].name === 'Fase folicular primaria') {
    periodClass.push('period');
  }
  return (
    <div>
        <div className={periodClass.join(' ')}>
          <p>{stagesData[currentStage].name}</p>
          <Icon type="info-circle" />
        </div>
      <Card>
        <div className="card">
          <h4>Entrenamiento</h4>
          <p>{stagesData[currentStage].sport.resume1}</p>
          <div>
            <Link
              to={'/sport/'+moment(selectedDay).format('YYYY-MM-DD')}
              >
              <Icon type="right" />
            </Link>
          </div>
        </div>
      </Card>
      <Card>
        <div className="card">
          <h4>Alimentación</h4>
          <p>{stagesData[currentStage].food.resume2}</p>
            <Link
              to={'/food/'+moment(selectedDay).format('YYYY-MM-DD')}
              >
              <Icon type="right" />
            </Link>
        </div>
      </Card>
      <Card>
        <div className="card">
          <h4>Sexualidad</h4>
          <p>{stagesData[currentStage].sex.resume3}</p>
            <Link
              to={'/sex/'+moment(selectedDay).format('YYYY-MM-DD')}
              >
              <Icon type="right" />
            </Link>
        </div>
      </Card>
      <Card>
        <div className="card">
          <h4>Estado de ánimo</h4>
          <p>{stagesData[currentStage].health.resume4}</p>
            <Link
              to={'/health/'+moment(selectedDay).format('YYYY-MM-DD')}
              >
              <Icon type="right" />
            </Link>
        </div>
      </Card>
    </div>
  );
}

export default DayInfo;