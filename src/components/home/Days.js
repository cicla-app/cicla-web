import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './Days.scss';
import Moment from 'react-moment';

class Days extends React.Component {
  state = {
    user: {
      ...this.props.user,
    },
    addClass: false
  }

  addDateHandleChange = ( date ) => {
    this.props.addDateHandleChange(date);
  }

  subtractDateHandleChange = ( date ) => {
    this.props.subtractDateHandleChange(date);
  }

  selectedDay = () => {
    this.props.selectedDay(this.props.day);
    
  }

  render() {
    console.log('las props',this.props);

    const periodClass = ["circle"];

    if(this.state.date <= new Date(this.props.period.follicular.primary)) {
      periodClass.push('period');
    }
    return (
      <div className="pagination-days">
        <div className={periodClass.join(' ')}>
          {/* <span className="cicle-days">2</span> */}
          <span
            onClick={()=>this.subtractDateHandleChange(3)}>
            <Moment
              date={this.props.day}
              subtract={{ days: 3 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className={periodClass.join(' ')}>
          {/* <span className="cicle-days">3</span> */}
          <span onClick={()=>this.subtractDateHandleChange(2)}>
            <Moment
              date={this.props.day}
              subtract={{ days: 2 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className={periodClass.join(' ')}>
          {/* <span className="cicle-days">4</span> */}
          <span onClick={()=>this.subtractDateHandleChange(1)}>
            <Moment
              date={this.props.day}
              subtract={{ days: 1 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className={`${periodClass.join(' ')} active`}>
          {/* <span className="cicle-days">5</span> */}
          <span>
            <Moment date={this.props.day} format="DD"></Moment>
          </span>
        </div>
        <div className={periodClass.join(' ')}>
          {/* <span className="cicle-days">6</span> */}
          <span onClick={()=>this.addDateHandleChange(1)}>
            <Moment
              date={this.props.day}
              add={{ days: 1 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className={periodClass.join(' ')}>
          {/* <span className="cicle-days">7</span> */}
          <span
            onClick={()=>this.addDateHandleChange(2)}>
            <Moment
              date={this.props.day}
              add={{ days: 2 }}
              format="DD">
            </Moment>
          </span>
        </div>
        <div className={periodClass.join(' ')}>
          {/* <span className="cicle-days">8</span> */}
          <span
            onClick={()=>this.addDateHandleChange(3)}>
            <Moment
              date={this.props.day}
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