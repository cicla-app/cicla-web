import React, { Component } from 'react';
import './App.scss';
import { Row, Col } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './guards/PrivateRoute';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Onboarding from './components/onboarding/Onboarding';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Col span={20} offset={2}>
            <section>
              <div>
                <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/onboarding" component={Onboarding}/>
                  <PrivateRoute exact path="/users"/>
                  <Redirect to="/login"/>
                </Switch>
              </div>
            </section>
            </Col>
        </Row>
      </div>
    );
  }
}

export default App;
