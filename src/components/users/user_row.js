import React from 'react';
import { Link } from 'react-router-dom';

const renderAction = (loading, userId, handleDeleteUser) => {
  if (loading) {
    return (
      <td colSpan={2} className="text-center">
        <i className="text-primary fas fa-circle-notch fa-2x fa-spin" />
      </td>
    );
  }

  return (
    <>
      <td>
        <Link to={`/dashboard/users/${userId}/edit`}>
          <i className="text-success fas fa-pencil-alt" />
        </Link>
      </td>
      <td onClick={() => handleDeleteUser(userId)}>
        <i className="text-danger fas fa-trash" />
      </td>
    </>
  );
};

const UserRow = ({
  user: {
    id,
    email,
    role,
    inserted_at,
    loading,
  },
  handleDeleteUser,
}) => (
  <tr key={id}>
    <td>{email}</td>
    <td>{role}</td>
    <td>{inserted_at}</td>
    {renderAction(loading, id, handleDeleteUser)}
  </tr>
);

export default UserRow;
