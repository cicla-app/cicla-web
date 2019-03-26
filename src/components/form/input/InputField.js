import React, { Component } from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

class InputField extends Component {
  render() {
    const {
      placeholder,
      value,
      errors,
      className,
      type,
      onChange,
      onblur
    } = this.props;
    const hasErrors = errors && errors.length > 0;
    return (
      <div className={`mb-1 ${className}`}>
        <Input
          onChange={onChange}
          value={value}
          {...(placeholder ? { placeholder } : null)}
          {...(type ? { type } : null)}
          {...(onblur ? { onBlur: onblur } : null)}
        />
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

InputField.defaultProps = {
  className: ''
};

export default InputField;