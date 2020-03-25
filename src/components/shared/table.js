import React from 'react';

const Table = ({ header, table_heads, children }) => (
  <div className="col">
    <div className="card">
      <div className="card-header border-0">
        <h3 className="mb-0">{header}</h3>
      </div>
      <div className="table-responsive">
        <table className="table align-items-center table-flush">
          <thead className="thead-light">
            <tr>{table_heads.map((head, index) => <th key={index}>{head}</th>)}</tr>
          </thead>
          <tbody className="list">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Table;
