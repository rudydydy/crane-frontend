import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DashboardForm from './shared/dashboard_form';
import InputField from './shared/input_field';
import { createApplication } from '../actions/applications';
import { isBlank } from '../helpers/validation';

const BREADCRUMB_ROUTES = [
  { link: '/dashboard/applications', title: 'Applications' },
  { title: 'New' },
]

class ApplicationsNew extends Component {
  constructor(props) {
    super(props);

    this.handleCreateApplication = this.handleCreateApplication.bind(this);
  }

  componentDidMount() {
    this.props.setBreadcrumbItems(BREADCRUMB_ROUTES);
  }

  componentDidUnmount() {
    this.props.setBreadcrumbItems([])
  }

  handleCreateApplication(params) {
    return this.props.createApplication(params)
      .then(() => {
        this.props.history.push('/dashboard/applications');
      })
  }

  render() {
    const { 
      loading, 
      handleSubmit, 
      submitting 
    } = this.props;

    return (
      <DashboardForm header="New Application">
        <form onSubmit={handleSubmit(this.handleCreateApplication)}>
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
                  disabled={loading || submitting}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </DashboardForm>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (isBlank(values.name)) {
    errors.name = "can't be blank";
  }

  if (isBlank(values.command)) {
    errors.command = "can't be blank";
  }

  return errors;
}

const mapStateToProps = ({ applications: { loading } }) => ({ 
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  createApplication: (params) => dispatch(createApplication(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'application_new_form',
  validate
})(ApplicationsNew))
