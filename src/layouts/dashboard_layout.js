import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './dashboard_layout/sidebar';
import MainContent from './dashboard_layout/main_content';
import { setBreadcrumbItems, setNewLink } from '../actions/breadcrumbs';
import { signOutUser } from '../actions/sessions';

function DashboardLayout(WrappedComponent) {
  class DashboardHOC extends Component {
    constructor(props) {
      super(props);

      document.body.className = 'bg-default';

      this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
      const { signOutUser } = this.props;
      signOutUser();
    }

    render() {
      const {
        breadcrumbItems,
        newLink,
        authenticated,
        role,
      } = this.props;

      if (!authenticated) {
        return <Redirect to="/sign_in" />;
      }

      return (
        <>
          <Sidebar
            role={role}
            handleSignOut={this.handleSignOut}
          />
          <MainContent
            breadcrumbItems={breadcrumbItems}
            newLink={newLink}
          >
            <WrappedComponent {...this.props} />
          </MainContent>
        </>
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
    ...breadcrumbs,
    authenticated,
    ...profiles,
  });

  const mapDispatchToProps = (dispatch) => ({
    setBreadcrumbItems: (payload) => dispatch(setBreadcrumbItems(payload)),
    setNewLink: (payload) => dispatch(setNewLink(payload)),
    signOutUser: () => dispatch(signOutUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(DashboardHOC);
}

export default DashboardLayout;
