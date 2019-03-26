import React, { Component } from 'react';
import './App.scss';
import Register from './components/register/Register';
import { Row, Col } from 'antd';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Row>
            <Col span={10} offset={8}>
              <h1>
                CICLA
              </h1>
            </Col>
          </Row>
          <Row>
            <Col span={10} offset={8}>
              <Register />
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;
