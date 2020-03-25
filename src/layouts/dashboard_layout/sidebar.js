import React from 'react';
import MenuLink from './menu_link';
import CraneLogo from '../../assets/img/crane_logo.png';

const ADMIN_ROLE = 'admin';
const CREATOR_ROLE = 'creator';
const ACTIVATOR_ROLE = 'activator';

const Sidebar = ({ email, role, handleSignOut }) => (
  <nav className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div className="scrollbar-inner">
      <div className="sidenav-header  align-items-center">
        <div className="navbar-brand">
          <b className="text-primary">Crane</b>
          <img src={CraneLogo} className="navbar-brand-img" alt="Logo" /> 
        </div>
      </div>
      <div className="navbar-inner">
        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
          <ul className="navbar-nav mb-md-3">
            <MenuLink 
              to="/dashboard"
              text="Dashboard"
              textColor="text-primary"
              icon="ni-planet"
            />
            {
              role === ADMIN_ROLE &&
              <MenuLink 
                to="/dashboard/users"
                text="Users"
                textColor="text-warning"
                icon="ni-circle-08"
              />
            }
            {
              role === ADMIN_ROLE &&
              <MenuLink 
                to="/dashboard/applications"
                text="Applications"
                textColor="text-info"
                icon="ni-collection"
              />
            }
            {
              (role === ADMIN_ROLE || role === CREATOR_ROLE) &&
              <MenuLink 
                to="/dashboard/shells"
                text="Shells"
                textColor="text-dark"
                icon="ni-laptop"
              />
            }
            {
              (role === ADMIN_ROLE || role === ACTIVATOR_ROLE) &&
              <MenuLink 
                to="/dashboard/activate"
                text="Activate Shell"
                textColor="text-success"
                icon="ni-laptop"
              />
            }
          </ul>
          <hr className="my-3" />
          <ul className="navbar-nav mb-md-3">
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() => handleSignOut()}
              >
                <i className="ni ni-button-power text-danger"></i>
                <span className="nav-link-text">Sign Out</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
)

export default Sidebar;
