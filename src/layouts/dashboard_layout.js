import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './dashboard_layout/sidebar';
import MainContent from './dashboard_layout/main_content';
import { setBreadcrumbItems } from '../actions/breadcrumbs';
import { signOutUser } from '../actions/sessions';

function DashboardLayout(WrappedComponent) {
  class DashboardHOC extends Component {
    constructor(props) {
      super(props);

      document.body.className = '';

      this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
      this.props.signOutUser();
    }

    render() {
      const { 
        breadcrumbs,
        authenticated, 
        email, 
        role 
      } = this.props;

      if (!authenticated) {
        return <Redirect to="/sign_in" />;
      }

      return (
        <Fragment>
          <Sidebar 
            email={email}
            role={role}
            handleSignOut={this.handleSignOut}
          />
          <MainContent breadcrumbs={breadcrumbs}>
            <WrappedComponent {...this.props} />
          </MainContent>
        </Fragment>
      );
    }
  }

  const mapStateToProps = ({ 
    breadcrumbs,
    sessions: { 
      authenticated,
    }, 
    profiles,
  }) => ({
    breadcrumbs,
    authenticated,
    ...profiles 
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setBreadcrumbItems: (payload) => dispatch(setBreadcrumbItems(payload)),
    signOutUser: () => dispatch(signOutUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(DashboardHOC)
}

export default DashboardLayout;
