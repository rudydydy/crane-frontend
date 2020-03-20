import React from 'react';
import { Link } from 'react-router-dom';
import CraneLogo from '../../assets/img/crane_logo.png';

const ADMIN_ROLE = 'admin';
const CREATOR_ROLE = 'creator';
const ACTIVATOR_ROLE = 'activator';

const Sidebar = ({ email, role, handleSignOut }) => (
  <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div className="scrollbar-inner">
      <div className="sidenav-header  align-items-center">
        <div className="navbar-brand">
          <span className="text-primary">Crane</span>
          <img src={CraneLogo} className="navbar-brand-img" /> 
        </div>
      </div>
      <div className="navbar-inner">
        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
          <ul className="navbar-nav mb-md-3">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="ni ni-planet text-primary"></i>
                <span className="nav-link-text">Dashboard</span>
              </Link>
            </li>
            {
              role === ADMIN_ROLE &&
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/users">
                  <i className="ni ni-circle-08 text-warning"></i>
                  <span className="nav-link-text">Users</span>
                </Link>
              </li>
            }
            {
              role === ADMIN_ROLE &&
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/applications">
                  <i className="ni ni-collection text-info"></i>
                  <span className="nav-link-text">Applications</span>
                </Link>
              </li>
            }
            {
              (role === ADMIN_ROLE || role === CREATOR_ROLE) &&
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/shells">
                  <i className="ni ni-laptop text-dark"></i>
                  <span className="nav-link-text">Shells</span>
                </Link>
              </li>
            }
            {
              (role === ADMIN_ROLE || role === ACTIVATOR_ROLE) &&
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/shells/activate">
                  <i className="ni ni-laptop text-success"></i>
                  <span className="nav-link-text">Activate Shell</span>
                </Link>
              </li>
            }
          </ul>
          <hr className="my-3" />
          <ul className="navbar-nav mb-md-3">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => handleSignOut()}
              >
                <i className="ni ni-button-power text-danger"></i>
                <span className="nav-link-text">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
)

export default Sidebar;
