import React  from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './Days.scss';

class Days extends React.Component {
  render() {
    return (
      <div className="pagination-days">
        <div className="circle period">
          <span className="cicle-days">2</span>
          <span>16</span>
        </div>
        <div className="circle period">
          <span className="cicle-days">3</span>
          <span>17</span>
        </div>
        <div className="circle period">
          <span className="cicle-days">4</span>
          <span>18</span>
        </div>
        <div className="circle active">
          <span className="cicle-days">5</span>
          <span>19</span>
        </div>
        <div className="circle">
          <span className="cicle-days">6</span>
          <span>20</span>
        </div>
        <div className="circle">
          <span className="cicle-days">6</span>
          <span>21</span>
        </div>
        <div className="circle">
          <span className="cicle-days">7</span>
          <span>22</span>
        </div>
      </div>
    );
  }
}

export default Days;