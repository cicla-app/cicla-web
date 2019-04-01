import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { PageHeader } from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Health extends React.Component {
  goBack(){
    history.goBack();
  }
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()} 
          title="ÁNIMO">
        </PageHeader>
      </div>
    );
  }
}

export default Health;