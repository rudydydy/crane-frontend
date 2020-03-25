import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DashboardForm from './shared/dashboard_form';
import ApplicationForm from './applications/application_form';
import { fetchApplication, updateApplication } from '../actions/applications';
import { isBlank } from '../helpers/validation';

const BREADCRUMB_ROUTES = [
  { link: '/dashboard/applications', title: 'Applications' },
  { title: 'Edit' },
];

class ApplicationsEdit extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateApplication = this.handleUpdateApplication.bind(this);
  }

  componentDidMount() {
    const {
      initialize,
      match: {
        params: {
          id,
        },
      },
      setBreadcrumbItems,
      fetchApplication,
    } = this.props;

    setBreadcrumbItems(BREADCRUMB_ROUTES);
    fetchApplication(id)
      .then(() => {
        const { selected } = this.props;
        initialize({ ...selected });
      });
  }

  componentWillUnmount() {
    const { setBreadcrumbItems } = this.props;
    setBreadcrumbItems([]);
  }

  handleUpdateApplication(params) {
    const {
      match: {
        params: {
          id,
        },
      },
      history: {
        push,
      },
      updateApplication,
    } = this.props;

    return updateApplication(id, params)
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
      <DashboardForm header="Edit Application">
        <form onSubmit={handleSubmit(this.handleUpdateApplication)}>
          <ApplicationForm
            disabled={loading || submitting}
            submitText="Update"
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

const mapStateToProps = ({ applications: { selected, loading } }) => ({
  selected,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApplication: (applicationId) => dispatch(fetchApplication(applicationId)),
  updateApplication: (applicationId, params) => dispatch(updateApplication(applicationId, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'application_edit_form',
  validate,
})(ApplicationsEdit));
