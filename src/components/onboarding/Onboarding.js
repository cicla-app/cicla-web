import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Onboarding.scss'
import { withAuthConsumer } from '../../contexts/AuthStore'
import {
  Button, PageHeader, Input, Calendar, Select, Row, Col
} from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Onboarding extends Component {
  state = {
    user: {
      alias:'',
      periodDays: '',
      cycleDays: '',
      contraceptives: false,
    },
    period: {
      startPeriod: '',
      endPeriod: ''
    },
    step: 0,
  };

  clickhandle = step => {
    this.setState( { step: step } );
  }

  handleStartDate = (startPeriod) => {
    this.setState({ period: { startPeriod }});
  };

  handleSelectChange = value => {
    const contraceptives = value === 'yes'? true : false;
    this.setState({user: {
      ...this.state.user,
        contraceptives
    }});
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
    })
  }

  render() {
    if ( this.state.step === 0 ) {
      return this.renderStep1();
    } else if( this.state.step === 1 ) {
      return this.renderStep2()
    } else if( this.state.step === 2 ) {
      return this.renderStep3()
    } else if( this.state.step === 3 ) {
      return this.renderStep4()
    } else if( this.state.step === 4 ) {
      return this.renderStep5()
    } else if( this.state.step === 5 ) {
      return this.renderStep6()
    }
  }
  goBack(){
    history.goBack();
  }

  renderStep1() {
    const { user } = this.state;
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}>
        </PageHeader>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle">¡Bienvenida, {user.alias}!</p>
              <p
                className="mt-3">
                Ahora te haremos unas pocas preguntas para saber más de ti y de tu ciclo menstrual y así poder adaptar la información a tus necesidades.
              </p>
              <Button
                block
                size="large"
                className="mt-3"
                onClick={() => this.clickhandle( 1 )}>
                Confirmar
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderStep2() {
    return (
      <div>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle calendar">¿Cuándo empezó tu última regla?</p>
            </Col>
          </Row>
            <div
              className="mb-2"
              style={{width: 300,
              border: '1px solid #d9d9d9',
              borderRadius: 4 }}>
              <Calendar
                fullscreen={false}
                onSelect={this.handleStartDate}/>
            </div>
          <Row style={{width: '100%'}}>
            <Col span={20} offset={2}>
              <Button
                block
                size="large"
                className="my-2"
                onClick={() => this.clickhandle( 2 )}>
                Siguiente
              </Button>
              <div
                onClick={() => this.clickhandle( 2 )}>
                No lo sé con seguridad
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderStep3() {
    const {user} = this.state;
    return (
      <div>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle calendar">¿Cuándo dura tu regla aproximadamente?</p>
              <Input
                className="mb-2"
                placeholder="4"
                type="number"
                name="periodDays"
                value={user.periodDays}
                onChange={this.handleChange}>
              </Input>
              <Button
                block
                size="large"
                className="my-2"
                onClick={() => this.clickhandle( 3 )}>
                Siguiente
              </Button>
              <div
                onClick={() => this.clickhandle( 3 )}>
                No lo sé con seguridad
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderStep4() {
    const {user} = this.state;
    return (
      <div>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle calendar">¿Cuándo dura tu ciclo aproximadamente?</p>
              <Input
                className="mb-2"
                type="number"
                name="cycleDays"
                placeholder="28"
                value={user.cycleDays}
                onChange={this.handleChange}>
              </Input>
              <Button
                block
                size="large"
                className="my-2"
                onClick={() => this.clickhandle( 4 )}>
                Siguiente
              </Button>
              <div
                onClick={() => this.clickhandle( 4 )}>
                No lo sé con seguridad
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderStep5() {
    const Option = Select.Option;
    return (
      <div>
        <div className="container-onboarding">
        <Row>
          <Col span={20} offset={2}>
            <p className="subtitle calendar">¿Usas anticonceptivos hormonales?</p>
            <Select
              defaultValue="no"
              name="contraceptives"
              onChange={this.handleSelectChange}
              style={{ width: '100%' }}>
              <Option value="yes">Sí</Option>
              <Option value="no">No</Option>
            </Select>
            <Button
              block
              size="large"
              className="my-2"
              onClick={() => this.clickhandle( 5 )}>
              Siguiente
            </Button>
            <div
              onClick={() => this.clickhandle( 5 )}>
              No lo sé con seguridad
            </div>
          </Col>
        </Row>
        </div>
      </div>
    );
  }

  renderStep6() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}>
        </PageHeader>
        <div className="container-onboarding">
          <p className="subtitle">¡Enhorabuena!</p>
          <p
            className="mt-3">
            Ya puedes empezar a usar CICLA
          </p>
          <Link
            to="/home"
            className="mt-3">
            Empezar
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(Onboarding));