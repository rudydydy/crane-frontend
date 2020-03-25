import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const renderAction = (loading, applicationId, handleDeleteApplication) => {
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
        <Link to={`/dashboard/applications/${applicationId}/edit`}>
          <i className="text-success fas fa-pencil-alt"></i>
        </Link>
      </td>
      <td onClick={() => handleDeleteApplication(applicationId)}>
        <i className="text-danger fas fa-trash"></i>
      </td>
    </Fragment>
  )
}

const ApplicationRow = ({ 
  application: { 
    id, 
    name, 
    command, 
    inserted_at,
    loading,
  },
  handleDeleteApplication,
}) => (
  <tr key={id}>
    <td>{name}</td>
    <td>{command}</td>
    <td>{inserted_at}</td>
    {renderAction(loading, id, handleDeleteApplication)}
  </tr>
)

export default ApplicationRow;
