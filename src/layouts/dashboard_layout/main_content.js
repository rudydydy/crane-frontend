import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = ({ breadcrumbs, children }) => (
  <div className="main-content" id="panel">
    <div className="header bg-primary pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">
                      <i className="ni ni-planet text-primary"></i>
                    </Link>
                  </li>
                  {
                    breadcrumbs.map((breadcrumb, index) => {
                      if (index === (breadcrumbs.length - 1)) {
                        return (
                          <li className="breadcrumb-item active">
                            {breadcrumb.title}
                          </li>
                        )
                      } 

                      return (
                        <li className="breadcrumb-item">
                          <Link to={breadcrumb.link}>
                            {breadcrumb.title}
                          </Link>
                        </li>
                      )
                    })
                  }
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid mt--6">
      <div className="row">
        {children}
      </div>
    </div>
  </div>
);

export default MainContent;
