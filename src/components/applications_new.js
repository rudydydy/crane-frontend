import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DashboardForm from './shared/dashboard_form';
import ApplicationForm from './applications/application_form';
import { createApplication } from '../actions/applications';
import { isBlank } from '../helpers/validation';

const BREADCRUMB_ROUTES = [
  { link: '/dashboard/applications', title: 'Applications' },
  { title: 'New' },
];

class ApplicationsNew extends Component {
  constructor(props) {
    super(props);

    this.handleCreateApplication = this.handleCreateApplication.bind(this);
  }

  componentDidMount() {
    const { setBreadcrumbItems } = this.props;
    setBreadcrumbItems(BREADCRUMB_ROUTES);
  }

  componentWillUnmount() {
    const { setBreadcrumbItems } = this.props;
    setBreadcrumbItems([]);
  }

  handleCreateApplication(params) {
    const {
      createApplication,
      history: {
        push,
      },
    } = this.props;

    return createApplication(params)
      .then(() => {
        push('/dashboard/applications');
      });
  }

  render() {
    const {
      loading,
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <DashboardForm header="New Application">
        <form onSubmit={handleSubmit(this.handleCreateApplication)}>
          <ApplicationForm
            disabled={loading || submitting}
            submitText="Create"
          />
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
};

const mapStateToProps = ({ applications: { loading } }) => ({
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  createApplication: (params) => dispatch(createApplication(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'application_new_form',
  validate,
})(ApplicationsNew));
