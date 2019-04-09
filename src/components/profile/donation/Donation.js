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
        <div className="container-data">
          <div>
            <p>Puedes ayudarnos donando a nuestra cuenta de Paypal:</p>
            <p>paypal.me/Cicla</p>
          </div>
        </div>
      </div>
    );
  }
}

export default (Donation);