import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import { withRouter } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Row, Col, PageHeader, Button, Switch
} from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class CicleData extends Component {
  state = {
    user: {
      periodDays: '',
      cycleDays: '',
      contraceptives: false,
    },
  };

  goBack(){
    history.goBack();
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

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

render() {
  const { user } = this.state;
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}
          title="Datos de ciclo">
        </PageHeader>
        <Row className="mt-3">
          <Col span={20} offset={2}>
            <form onSubmit={this.onSubmit}>
              <Input
                type="number"
                size="large"
                className='mb-2'
                name="periodDays"
                placeholder="Duración de la regla"
                onChange={this.handleChange}
                value={user.name}
                onBlur={this.handleBlur} />
              <Input
                type="number"
                size="large"
                className='mb-2'
                name="cycleDays"
                placeholder="Duración del ciclo"
                onChange={this.handleChange}
                value={user.email}
                onBlur={this.handleBlur}/>
              <Row className="my-1">
                <Col span={20} offset={2}>
                  <Row>
                    <Col span={4}>
                      <Switch
                        defaultChecked>
                      </Switch>
                    </Col>
                    <Col span={20}>
                      <p>Anticonceptivos</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Button
                className="my-3"
                block
                size="large"
                htmlType="submit">
                Guardar
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(CicleData));