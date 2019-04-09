import React from 'react';
import { Card, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../home/Home.scss';
import stagesData from '../../data/stages.json'

const stageNames = [
  'follicularPrimary',
  'follicularSecondary',
  'follicularLatest',
  'ovulation',
  'luteaPrimary',
  'luteaSecondary',
  'luteaLatest'
]

const DayInfo = ({ selectedDay, period }) => {

  const stages = [
    period.follicular.primary,
    period.follicular.secondary,
    period.follicular.latest,
    period.ovulation,
    period.lutea.primary,
    period.lutea.secondary,
    period.lutea.latest
  ].map(d => new Date(d))

  const getCurrentStage = () => {
    const date = new Date(selectedDay);
    date.setHours(0)
    date.setMinutes(0)
    date.setMilliseconds(0)

    for(let i = 0, l = stages.length; i < l; i++) {
      if (date <= stages[i]) {
        return stageNames[i]
      }
    }
  }

  const currentStage = getCurrentStage()

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
          <p>{stagesData[currentStage].resume1}</p>
          <div>
            <NavLink
                to='/sport'>
              <Icon type="right" />
            </NavLink>
          </div>
        </div>
      </Card>
      <Card>
        <div className="card">
          <h4>Alimentación</h4>
          <p>{stagesData[currentStage].resume2}</p>
          <NavLink
            to='/sport'>
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