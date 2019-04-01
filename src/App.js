import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './guards/PrivateRoute';
import Web from './components/web/Web';
import Login from './components/login/Login';
import Prelogin from './components/prelogin/Prelogin';
import Register from './components/register/Register';
import Onboarding from './components/onboarding/Onboarding';
import Home from './components/home/Home';
import ModifyPassword from './components/modify-password/ModifyPassword';
import AccessData from './components/access-data/Access-data';
import CicleData from './components/cicle-data/Cicle-data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <div>
            <Switch>
              <Route exact path="/" component={Web}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/prelogin" component={Prelogin}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/modify-password" component={ModifyPassword}/>
              <Route exact path="/onboarding" component={Onboarding}/>
              <Route exact path="/access-data" component={AccessData}/>
              <Route exact path="/cicle-data" component={CicleData}/>
              <PrivateRoute exact path="/home" component={Home}/>
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
