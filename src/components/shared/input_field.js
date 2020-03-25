import React from 'react';

const InputField = ({ input, label, placeholder, type, disabled, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="form-control-label">{label}</label>
    <input
      {...input} 
      className="form-control" 
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
    {touched && error && <span className="text-danger">{error}</span>}
  </div>
);

export default InputField;
