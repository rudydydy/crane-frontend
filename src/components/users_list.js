import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './shared/table';
import { fetchUsers } from '../actions/users';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderList() {
    const { loading, list } = this.props;

    if (loading) {
      return "Loading..."
    }

    return list.map((user) => (
      <tr key={user.id}>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.inserted_at}</td>
        <td />
      </tr>
    ))
  }

  render() {
    return (
      <Table
        header="Users"
        table_heads={['Email', 'Role', 'Created At', '']}
      >
        {this.renderList()}
      </Table>
    )
  }
}

const mapStateToProps = ({ users }) => ({ ...users });

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
