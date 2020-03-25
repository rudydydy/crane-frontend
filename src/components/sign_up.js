import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from "react-router-dom";
import InputGroupField from './shared/input_group_field';
import { signUpUser } from '../actions/sessions';
import { isBlank, isEmailFormat } from '../helpers/validation';
import CraneLogo from '../assets/img/crane_logo.png';

class SignUp extends Component {
  constructor(props) {
    super(props)

    document.body.className = 'bg-default';

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(params) {
    return this.props.SignUpUser(params);
  }

  render() {
    const { 
      authenticated,
      loading,
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
              <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>
        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card bg-secondary border-0 mb-0">
                <div className="card-header bg-transparent">
                  <img src={CraneLogo} style={{ width: '20%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} alt="Logo" /> 
                </div>
                <div className="card-body px-lg-5">
                  <form onSubmit={handleSubmit(this.handleSignUp)}>
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
                    <Field
                      name="password_confirmation"
                      type="password"
                      placeholder="Password Confirmation"
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
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6" />
                <div className="col-6 text-right">
                  <Link to="/sign_in" className="text-light">
                    <small>Already have an account? Sign In</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {};

  if (isBlank(values.email)) {
    errors.email = "can't be blank";
  } else if (!isEmailFormat(values.email)) {
    errors.email = 'invalid email format';
  }

  if (isBlank(values.password)) {
    errors.password = "can't be blank";
  }

  if (isBlank(values.password_confirmation)) {
    errors.password_confirmation = "can't be blank";
  }

  if (values.password && values.password_confirmation) {
    if (values.password !== values.password_confirmation) {
      errors.password = 'not match password confirmation';
    }
  }

  return errors;
}

const mapStateToProps = ({ sessions }) => ({ ...sessions });

const mapDispatchToProps = (dispatch) => ({
  SignUpUser: (params) => dispatch(signUpUser(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'sign_up_form',
  validate,
})(SignUp))
