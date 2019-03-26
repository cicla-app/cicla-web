import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasColor: props.color,
   };
  }

  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

export default Buttons;