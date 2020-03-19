import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from './shared/input_field';

class SignIn extends Component {
  constructor(props) {
    super(props)

    document.body.className = 'bg-default';

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(params) {
    console.log("SSUBMIT", params);
  }

  renderTopGradation() {
    return (
			<div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
				<div className="separator separator-bottom separator-skew zindex-100">
					<svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
					</svg>
				</div>
			</div>
    );
  }

  renderCreateAccount() {
    return (
			<div className="row mt-3">
				<div className="col-6" />
				<div className="col-6 text-right">
					<a className="text-light"><small>Create new account</small></a>
				</div>
			</div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="main-content">
        {this.renderTopGradation()}
        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card bg-secondary border-0 mb-0">
                <div className="card-body px-lg-5 py-lg-5">
                  <form onSubmit={handleSubmit(this.handleSignIn)}>
										<Field
											name="email"
											type="email"
											label="email"
                      icon="ni-email-83"
											component={InputField}
										/>
										<Field
											name="password"
											type="password"
											label="Password"
                      icon="ni-lock-circle-open"
											component={InputField}
										/>
                    <div className="text-center">
                      <button 
                        type="submit" 
                        className="btn btn-primary my-4"
                        disabled={submitting}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {this.renderCreateAccount()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'sign_in_form' 
})(SignIn)
