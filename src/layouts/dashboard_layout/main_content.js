import React from 'react';

const MainContent = ({ children }) => (
  <div className="main-content" id="panel">
    <div className="header bg-primary pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li className="breadcrumb-item"><i className="fas fa-home"></i></li>
                  <li className="breadcrumb-item">Dashboards</li>
                  <li className="breadcrumb-item active" aria-current="page">Default</li>
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
