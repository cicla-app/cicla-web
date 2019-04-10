import React from 'react';
import { Card, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
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
      <Card>
        <div className={periodClass.join(' ')}>
          <Icon type="info-circle" />
          <p>{stagesData[currentStage].name}</p>
        </div>
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
          <p>{stagesData[currentStage].resume2}</p>
          <NavLink
            to='/sport:selectedDay'>
            <Icon type="right" />
          </NavLink>
        </div>
      </Card>
      <Card>
        <div className="card">
          <h4>Sexualidad</h4>
          <p>{stagesData[currentStage].resume3}</p>
          <NavLink
            to='/sport'>
            <Icon type="right" />
          </NavLink>
        </div>
      </Card>
      <Card>
        <div className="card">
          <h4>Estado de ánimo</h4>
          <p>{stagesData[currentStage].resume4}</p>
          <NavLink
            to='/sport'>
            <Icon type="right" />
          </NavLink>
        </div>
      </Card>
    </div>
  );
}

export default DayInfo;