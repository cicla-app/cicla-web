import React, { Component } from 'react';
import authService from '../../services/AuthService';
import { Link, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Onboarding.scss';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Button, PageHeader, Input, Select, Row, Col
} from 'antd';
import { createBrowserHistory } from 'history';
import Logo from '../header/Logo';
import Calendar from 'react-calendar';

const history = createBrowserHistory();

class Onboarding extends Component {
  state = {
    user: {
      ...this.props.user,
      periodDays: '',
      cycleDays: '',
      contraceptives: false,
    },
    step: 0
  };

  clickhandle = step => {
    if (step === 5) {
      authService.updateUser(this.state.user)
        .then(user => {
          this.setState( { step: step });
        }, (error) => console.error(error))
    } else {
      this.setState( { step: step });
    }
  }

  handleStartDate = (startPeriod) => {
    authService.createPeriod(this.props.user.id, startPeriod)
    this.setState({
      user: {
        ...this.state.user,
        startPeriod: startPeriod
      },
    })
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
    const { user } = this.props;
    return (
      <div>
        <Logo></Logo>
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
              className="mb-2">
              <Calendar
                onClickDay={this.handleStartDate}
                value={this.state.startPeriod}/>
            </div>
          <Row style={{width: '100%'}}>
            <Col span={20} offset={2}>
              <Button
                block
                size="large"
                className="my-2"
                disabled={!this.state.user.startPeriod}
                onClick={() => this.clickhandle( 2 )}>
                Siguiente
              </Button>
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
                placeholder="5"
                type="number"
                name="periodDays"
                value={user.periodDays}
                onChange={this.handleChange}>
              </Input>
              <Button
                block
                size="large"
                className="my-2"
                disabled={!this.state.user.periodDays}
                onClick={() => this.clickhandle( 3 )}>
                Siguiente
              </Button>
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
                placeholder="31"
                value={user.cycleDays}
                onChange={this.handleChange}>
              </Input>
              <Button
                block
                size="large"
                className="my-2"
                disabled={!this.state.user.cycleDays}
                onClick={() => this.clickhandle( 4 )}>
                Siguiente
              </Button>
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
          </Col>
        </Row>
        </div>
      </div>
    );
  }

  renderStep6() {
    console.log(this.state.user)
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
            to={{
              pathname: '/home',
              state: {
                userId: this.state.user.id
              }
            }}
            className="mt-3">
            Empezar
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(Onboarding));