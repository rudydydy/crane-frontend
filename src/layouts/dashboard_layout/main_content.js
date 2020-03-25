import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = ({ breadcrumbItems, newLink, children }) => (
  <div className="main-content" id="panel">
    <div className="header bg-default pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li className="breadcrumb-item">
                    <i className="ni ni-planet text-primary" />
                  </li>
                  {
                    breadcrumbItems.map((breadcrumb, index) => {
                      if (index === (breadcrumbItems.length - 1)) {
                        return (
                          <li key={index} className="breadcrumb-item active">
                            {breadcrumb.title}
                          </li>
                        );
                      }

                      return (
                        <li key={index} className="breadcrumb-item">
                          <Link to={breadcrumb.link}>
                            {breadcrumb.title}
                          </Link>
                        </li>
                      );
                    })
                  }
                </ol>
              </nav>
            </div>
            <div className="col-lg-6 col-5 text-right">
              {newLink && <Link to={newLink} className="btn btn-sm btn-neutral">New</Link>}
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
