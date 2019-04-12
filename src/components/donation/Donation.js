import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Donation extends Component {
  goBack(){
    history.goBack();
  }

render() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}
          title="DONACIONES">
        </PageHeader>
        <div className="background">
          <div className="container-data">
            <h5>Apoya nuestro trabajo. Este proyecto sólo es posible con tu ayuda.</h5>
            <p>Desde una plataforma que nos provee con los recursos y el apoyo necesarios para llevar nuestra idea a la realidad gracias al apoyo de la comunidad.</p>
            <p>Puedes ayudar a dar vida a este proyecto en:</p>
            <div className="link">
              <a
                href="https://www.kickstarter.com/">
                DONAR A CICLA
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (Donation);