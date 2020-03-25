import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './shared/table';
import UserRow from './users_list/user_row';
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

    return list.map((user) => <UserRow user={user} />);
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
