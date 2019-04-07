import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Header.scss';
import { createBrowserHistory } from 'history';
import { Navbar } from 'react-bootstrap';
import { 
  Icon, Button
} from 'antd';

const history = createBrowserHistory();

class Header extends Component {
  goBack(){
    history.goBack();
  }

render() {
  return (
    <div className="header">
      <Navbar expand="lg">
        <Navbar.Brand
          href="/"
          className="logo"></Navbar.Brand>
        <Button
          size="large"
          className="link-button"
          variant="outline-success"
          onClick={() => this.goBack()} >
          <Icon
            type="close"
            style={{ fontSize: '28px' }} />
        </Button>
      </Navbar>
    </div>
  );
  }
}

export default Header;