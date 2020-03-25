import React from 'react';
import { Field } from 'redux-form';
import InputField from '../shared/input_field';

const ApplicationForm = ({ disabled, submitText }) => (
  <div className="pl-lg-4">
    <div className="row">
      <div className="col-lg-12">
        <Field
          name="name"
          type="text"
          label="Name"
          placeholder="Name"
          component={InputField}
        />
      </div>
      <div className="col-lg-12">
        <Field
          name="command"
          type="text"
          label="Command"
          placeholder="Command"
          component={InputField}
        />
      </div>
      <div className="col-lg-12 text-right">
        <button 
          type="submit" 
          className="btn btn-primary my-4"
          disabled={disabled}
        >
          {submitText}
        </button>
      </div>
    </div>
  </div>
)

export default ApplicationForm;
