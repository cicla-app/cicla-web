import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './Days.scss';
import Moment from 'react-moment';

class Days extends React.Component {
  state = {
    date: new Date(),
  }

  addDateHandleChange = ( days ) => {
    const newDate = new Date( this.state.date.setDate(this.state.date.getDate() + days) );
    this.setState({
      date: newDate
    })
  }

  subtractDateHandleChange = ( days ) => {
    const newDate = new Date( this.state.date.setDate(this.state.date.getDate() - days) );
    this.setState({
      date: newDate
    })
  }

  render() {
    return (
      <div className="pagination-days">
        <div className="circle period">
          <span className="cicle-days">2</span>
          <span onClick={()=>this.subtractDateHandleChange(3)}>
            <Moment
              date={this.state.date}
              subtract={{ days: 3 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className="circle period">
          <span className="cicle-days">3</span>
          <span onClick={()=>this.subtractDateHandleChange(2)}>
            <Moment
              date={this.state.date}
              subtract={{ days: 2 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className="circle period">
          <span className="cicle-days">4</span>
          <span onClick={()=>this.subtractDateHandleChange(1)}>
            <Moment
              date={this.state.date}
              subtract={{ days: 1 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className="circle active">
          <span className="cicle-days">5</span>
          <span>
            <Moment date={this.state.date} format="DD"></Moment>
          </span>
        </div>
        <div className="circle">
          <span className="cicle-days">6</span>
          <span onClick={()=>this.addDateHandleChange(2)}>
            <Moment
              date={this.state.date}
              add={{ days: 1 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className="circle">
          <span className="cicle-days">6</span>
          <span
            onClick={()=>this.addDateHandleChange(2)}>
            <Moment
              date={this.state.date}
              add={{ days: 2 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className="circle">
          <span className="cicle-days">7</span>
          <span
            onClick={()=>this.addDateHandleChange(3)}>
            <Moment
              date={this.state.date}
              add={{ days: 3 }}
              format="DD">
            </Moment>
          </span>
        </div>
      </div>
    );
  }
}

export default Days;