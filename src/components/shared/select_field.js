import React from 'react';

const InputField = ({
  input, label, options, meta: { touched, error },
}) => (
  <div className="form-group">
    <label className="form-control-label">{label}</label>
    <select
      {...input}
      className="form-control"
    >
      {
        options.map(({ value, name }, index) => (
          <option
            key={index}
            value={value}
          >
            {name}
          </option>
        ))
      }
    </select>
    {touched && error && <span className="text-danger">{error}</span>}
  </div>
);

export default InputField;
