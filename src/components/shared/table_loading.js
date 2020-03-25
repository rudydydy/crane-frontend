import React from 'react';

const TableLoading = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="text-center">
      <i className="text-primary fas fa-circle-notch fa-3x fa-spin"></i>
    </td>
  </tr>
)

export default TableLoading;
