import React from 'react';

const UserRow = ({ user: { id, email, role, inserted_at } }) => (
  <tr key={id}>
    <td>{email}</td>
    <td>{role}</td>
    <td>{inserted_at}</td>
    <td />
  </tr>
)

export default UserRow;
