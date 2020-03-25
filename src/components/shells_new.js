import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DashboardForm from './shared/dashboard_form';
import ShellForm from './shells/shell_form';
import { fetchApplications } from '../actions/applications';
import { createShell } from '../actions/shells';
import { isBlank } from '../helpers/validation';

const BREADCRUMB_ROUTES = [
  { link: '/dashboard/shells', title: 'Shells' },
  { title: 'New' },
]

class ShellsNew extends Component {
  constructor(props) {
    super(props);

    this.handleCreateShell = this.handleCreateShell.bind(this);
  }

  componentDidMount() {
    const { 
      fetchApplications,
      setBreadcrumbItems,
    } = this.props;

    fetchApplications();
    setBreadcrumbItems(BREADCRUMB_ROUTES);
  }

  componentWillUnmount() {
    this.props.setBreadcrumbItems([])
  }

  handleCreateShell(params) {
    return this.props.createShell(params)
      .then(() => {
        this.props.history.push('/dashboard/shells');
      })
  }

  render() {
    const { 
      applicationLists,
      applicationLoading,
      shellLoading, 
      handleSubmit, 
      submitting 
    } = this.props;

    console.log(this.props);

    const applicationOptions = applicationLists.map(({ id, name }) => ({ value: id, name }))

    return (
      <DashboardForm header="New Shell">
        <form onSubmit={handleSubmit(this.handleCreateShell)}>
          <ShellForm 
            applicationOptions={applicationOptions}
            disabled={applicationLoading || shellLoading || submitting} 
            submitText="Create"
          />
        </form>
      </DashboardForm>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (isBlank(values.application_id)) {
    errors.name = "can't be blank";
  }

  return errors;
}

const mapStateToProps = ({ applications, shells }) => ({ 
  applicationLists: applications.list,
  applicationLoading: applications.loading,
  shellLoading: shells.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApplications: () => dispatch(fetchApplications()),
  createShell: (params) => dispatch(createShell(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'shell_new_form',
  validate
})(ShellsNew))
