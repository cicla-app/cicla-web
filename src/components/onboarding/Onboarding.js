import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Onboarding.scss'
import { withAuthConsumer } from '../../contexts/AuthStore'
import {
  Button, PageHeader, Input, Calendar, Select, Row, Col
} from 'antd';

class Register extends Component {
  state = {
    step: 0
  };

  clickhandle = step => {
    this.setState( { step: step } );
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

  renderStep1() {
    return (
      <div>
        <PageHeader
          onBack={() => null}>
        </PageHeader>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle">¡Bienvenida!</p>
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
                <Calendar fullscreen={false}  />
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
    return (
      <div>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle calendar">¿Cuándo dura tu regla aproximadamente?</p>
              <Input
                className="mb-2"
                placeholder="4 días">
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
    return (
      <div>
        <div className="container-onboarding">
          <Row>
            <Col span={20} offset={2}>
              <p className="subtitle calendar">¿Cuándo dura tu ciclo aproximadamente?</p>
              <Input
                className="mb-2"
                placeholder="28 días">
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
            <Select defaultValue="no" style={{ width: '100%' }}>
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
          onBack={() => null}>
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

export default withAuthConsumer(Register);