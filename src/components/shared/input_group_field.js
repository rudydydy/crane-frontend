import React from 'react';

const InputGroupField = ({ input, icon, placeholder, type, meta: { touched, error } }) => (
  <div className="form-group">
    <div className="input-group input-group-merge input-group-alternative">
      {
        icon &&
        <div className="input-group-prepend">
          <span className="input-group-text"><i className={`ni ${icon}`}></i></span>
        </div>
      }
      <input
        {...input} 
        className="form-control" 
        placeholder={placeholder} 
        type={type}
      />
    </div>
    {touched && error && <span className="text-danger">{error}</span>}
  </div>
);

export default InputGroupField;
