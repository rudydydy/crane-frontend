import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './shared/table';
import TableLoading from './shared/table_loading';
import UserRow from './users_list/user_row';
import { fetchUsers, deleteUser } from '../actions/users';

class UsersList extends Component {
  constructor(props) {
    super(props);
    
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleDeleteUser(userId) {
    const answer = window.confirm("are you sure you want to delete this user?");

    if (answer) {
      this.props.deleteUser(userId);
    }
  }

  renderList() {
    const { loading, list } = this.props;

    if (loading) {
      return <TableLoading colSpan={5} />
    }

    return list.map((user, index) => (
      <UserRow 
        key={index} 
        user={user} 
        handleDeleteUser={this.handleDeleteUser}
      />
    ));
  }

  render() {
    return (
      <Table
        header="Users"
        table_heads={['Email', 'Role', 'Created At', '', '']}
      >
        {this.renderList()}
      </Table>
    )
  }
}

const mapStateToProps = ({ users: { list, loading } }) => ({ 
  list,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
