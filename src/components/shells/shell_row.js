import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const renderAction = (loading, shellId, handleDeleteShell) => {
  if (loading) {
    return (
      <td colSpan={2} className="text-center">
        <i className="text-primary fas fa-circle-notch fa-2x fa-spin"></i>
      </td>
    );
  }

  return (
    <Fragment>
      <td>
        <Link to={`/dashboard/shells/${shellId}/edit`}>
          <i className="text-success fas fa-pencil-alt"></i>
        </Link>
      </td>
      <td onClick={() => handleDeleteShell(shellId)}>
        <i className="text-danger fas fa-trash"></i>
      </td>
    </Fragment>
  )
}

const shellRow = ({ 
  shell: { 
    id, 
    token,
    application, 
    status, 
    activated_at,
    expired_at,
    creator,
    activator,
    loading,
  },
  handleDeleteShell,
}) => (
  <tr key={id}>
    <td>{token}</td>
    <td>{application && application.name}</td>
    <td>{status}</td>
    <td>{creator && creator.email}</td>
    <td>{activator && activator.email}</td>
    <td>{activated_at}</td>
    <td>{expired_at}</td>
    {renderAction(loading, id, handleDeleteShell)}
  </tr>
)

export default shellRow;
