import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import InputGroupField from './shared/input_group_field';
import { signInUser, clearErrorMessage } from '../actions/sessions';
import CraneLogo from '../assets/img/crane_logo.png';

class SignIn extends Component {
  constructor(props) {
    super(props);

    document.body.className = 'bg-default';

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    const { clearErrorMessage } = this.props;
    clearErrorMessage();
  }

  handleSignIn(params) {
    const { signInUser } = this.props;
    return signInUser(params);
  }

  render() {
    const {
      authenticated,
      loading,
      message,
      handleSubmit,
      submitting,
    } = this.props;

    if (authenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="main-content">
        <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon className="fill-default" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </div>
        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card bg-secondary border-0 mb-0">
                <div className="card-header bg-transparent">
                  <img
                    src={CraneLogo}
                    style={{
                      width: '20%', display: 'block', marginLeft: 'auto', marginRight: 'auto',
                    }}
                    alt="Logo"
                  />
                </div>
                <div className="card-body px-lg-5">
                  <div className="text-center text-muted mb-4">
                    {message && <small className="text-danger">{message}</small>}
                  </div>
                  <form onSubmit={handleSubmit(this.handleSignIn)}>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      icon="ni-email-83"
                      autocomplete="off"
                      component={InputGroupField}
                    />
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      icon="ni-lock-circle-open"
                      autocomplete="off"
                      component={InputGroupField}
                    />
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary my-4"
                        disabled={loading || submitting}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6" />
                <div className="col-6 text-right">
                  <Link to="/sign_up" className="text-light">
                    <small>Don’t have an account? Sign Up</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sessions }) => ({ ...sessions });

const mapDispatchToProps = (dispatch) => ({
  signInUser: (params) => dispatch(signInUser(params)),
  clearErrorMessage: () => dispatch(clearErrorMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'sign_in_form',
})(SignIn));
