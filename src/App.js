import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './guards/PrivateRoute';
// import Web from './components/web/Web';
import Login from './components/login/Login';
import Prelogin from './components/prelogin/Prelogin';
import Register from './components/register/Register';
import Onboarding from './components/onboarding/Onboarding';
import Home from './components/home/Home';
import ModifyPassword from './components/modify-password/ModifyPassword';
import AccessData from './components/access-data/Access-data';
import CicleData from './components/cicle-data/Cicle-data';
import Sport from './components/home/tips/Sport';
import Food from './components/home/tips/Food';
import Health from './components/home/tips/Health';
import Sex from './components/home/tips/Sex';
import ColaboratorData from './components/colaborator-data/Colaborator-data';
import Policies from './components/conditions/Policies';
import Conditions from './components/conditions/Conditions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <div>
            <Switch>
              {/* <Route exact path="/" component={Web}/> */}
              <Route exact path="/login" component={Login}/>
              <Route exact path="/" component={Prelogin}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/modify-password" component={ModifyPassword}/>
              <Route exact path="/onboarding" component={Onboarding}/>
              <Route exact path="/policies" component={Policies}/>
              <Route exact path="/conditions" component={Conditions}/>
              <Route exact path="/access" component={AccessData}/>
              <Route exact path="/cicle" component={CicleData}/>
              <PrivateRoute exact path="/colaborator" component={ColaboratorData}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/sport" component={Sport}/>
              <PrivateRoute exact path="/food" component={Food}/>
              <PrivateRoute exact path="/health" component={Health}/>
              <PrivateRoute exact path="/sex" component={Sex}/>
              <PrivateRoute exact path="/users"/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
