import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DashboardForm from './shared/dashboard_form';
import InputField from './shared/input_field';
import SelectField from './shared/select_field';
import { fetchUser, updateUser } from '../actions/users';
import { isBlank } from '../helpers/validation';

const BREADCRUMB_ROUTES = [
  { link: '/dashboard/users', title: 'Users' },
  { title: 'Edit' },
];

const ROLE_OPTIONS = [
  { value: 'admin', name: 'Admin' },
  { value: 'creator', name: 'Creator' },
  { value: 'activator', name: 'Activator' },
];

class UsersEdit extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateUser = this.handleUpdateUser.bind(this);
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
      fetchUser,
    } = this.props;

    setBreadcrumbItems(BREADCRUMB_ROUTES);
    fetchUser(id)
      .then(() => {
        const { selected } = this.props;
        initialize({ ...selected });
      });
  }

  componentWillUnmount() {
    const { setBreadcrumbItems } = this.props;
    setBreadcrumbItems([]);
  }

  handleUpdateUser(params) {
    const {
      match: {
        params: {
          id,
        },
      },
      history: {
        push,
      },
      updateUser,
    } = this.props;

    updateUser(id, params)
      .then(() => {
        push('/dashboard/users');
      });
  }

  render() {
    const {
      loading,
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <DashboardForm header="Edit User">
        <form onSubmit={handleSubmit(this.handleUpdateUser)}>
          <div className="pl-lg-4">
            <div className="row">
              <div className="col-lg-12">
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  disabled
                  component={InputField}
                />
              </div>
              <div className="col-lg-12">
                <Field
                  name="role"
                  label="Role"
                  options={ROLE_OPTIONS}
                  component={SelectField}
                />
              </div>
              <div className="col-lg-12 text-right">
                <button
                  type="submit"
                  className="btn btn-primary my-4"
                  disabled={loading || submitting}
                >
                  Update
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

  if (isBlank(values.role)) {
    errors.role = "can't be blank";
  }

  return errors;
};

const mapStateToProps = ({ users: { selected, loading } }) => ({
  selected,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  updateUser: (userId, params) => dispatch(updateUser(userId, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'user_edit_form',
  validate,
})(UsersEdit));
