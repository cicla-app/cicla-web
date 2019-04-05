import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Header.scss';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Icon
} from 'antd';

class Header extends Component {
render() {
  return (
    <div className="header">
      <Navbar expand="lg">
        <Navbar.Brand
          href="/"
          className="logo"></Navbar.Brand>
        <Link
          size="large"
          className="link-button"
          variant="outline-success"
          to="/">
          <Icon
            type="close"
            style={{ fontSize: '28px' }} />
        </Link>
      </Navbar>
    </div>
  );
  }
}

export default Header;