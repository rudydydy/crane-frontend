import React from 'react';

const DashboardForm = ({ header, children }) => (
  <div className="col-xl-12">
    <div className="card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col-8">
            <h3 className="mb-0">{header}</h3>
          </div>
        </div>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  </div>
)

export default DashboardForm;
