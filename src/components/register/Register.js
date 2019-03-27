import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import './Register.scss'
import { withAuthConsumer } from '../../contexts/AuthStore'
import {
  Form, Input, Button, Divider, Switch, PageHeader, Row, Col, notification
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
    }
  }

  renderStep1() {
    return (
      <div>
        <PageHeader
          onBack={() => null}
          title="CREAR CUENTA">
        </PageHeader>
        <div className="container-register">
          <p className="subtitle">Introduce tus datos para acceder a la aplicación</p>
          <Form>
            <Input
              placeholder="Email" />
            <Input
              type="password"
              placeholder="Password" />
          </Form>
          <Button
            block
            size="large"
            onClick={() => this.clickhandle( 1 )}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }

  renderStep2() {
    return (
      <div>
        <PageHeader
          onBack={() => null}
          title="CREAR CUENTA">
        </PageHeader>
        <div className="container-register">
          <p className="subtitle">Introduce el nombre con el que quieras que nos refiramos a ti</p>
          <Input
            className="mb-2"
            placeholder="Nombre">
          </Input>
          <Row className="my-1">
            <Col span={4}>
              <Switch
                defaultChecked>
              </Switch>
            </Col>
            <Col span={20}>
              <p>Acepto la política de privacidad y las condiciones del servicio</p>
            </Col>
          </Row>
          <Button
            block
            size="large"
            onClick={() => this.clickhandle( 2 )}>
            Crear cuenta
          </Button>
        </div>
      </div>
    );
  }

  renderStep3() {
    const openNotification = () => {
      notification.open({
        message: '¡Hecho!',
        description: 'Hemos reenviado el mail de confirmación, si no lo ves en tu bandeja de entrada revisa la carpeta de Spam.',
        onClick: () => {},
      });
    };
    return (
      <div>
        <PageHeader
          onBack={() => null}
          title="CREAR CUENTA">
          </PageHeader>
        <div className="container-register">
          <p className="mt-3">Confirma tu e-mail</p>
          <p>Hemos enviado un mail a la dirección:</p>
          <p>nombre@mail.com</p>
          <p className="mb-3">Sigue las instrucciones para verificar tu cuenta.</p>
          <p className="mt-3">¿No te ha llegado mail?</p>
          <Button
            block
            size="large"
            onClick={openNotification}>
            Reenviar mail de confirmación
          </Button>
          <Divider></Divider>
          <Link to="/login">Confirmar más tarde</Link>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(Register);