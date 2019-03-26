import React, { Component } from 'react';
import { Checkbox } from 'antd';

class CheckboxField extends Component {
  render() {
    const { label, onChange, errors } = this.props;
    const hasErrors = errors && errors.length > 0;
    return (
      <div className="mb-1">
        <label>
          <Checkbox
            style={{ marginRight: '8px' }}
            onChange={onChange} />
          {label}
        </label>
        {hasErrors &&
          errors.map((error, index) => (
            <p className="error" key={index}>
              {error}
            </p>
          ))}
      </div>
    );
  }
}

export default CheckboxField;