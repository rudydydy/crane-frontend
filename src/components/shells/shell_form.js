import React from 'react';
import { Field } from 'redux-form';
import SelectField from '../shared/select_field';

const ShellForm = ({ applicationOptions, disabled, submitText }) => (
  <div className="pl-lg-4">
    <div className="row">
      <div className="col-lg-12">
        <Field
          name="application_id"
          label="Application"
          options={applicationOptions}
          component={SelectField}
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
);

export default ShellForm;
