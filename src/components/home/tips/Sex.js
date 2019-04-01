import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { PageHeader } from 'antd';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Sex extends React.Component {
  goBack(){
    history.goBack();
  }
  render() {
    return (
      <div>
       <PageHeader
          onBack={() => this.goBack()} 
          title="SEXUALIDAD">
        </PageHeader>
      </div>
    );
  }
}

export default Sex;