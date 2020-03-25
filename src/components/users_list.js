import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './shared/table';
import TableLoading from './shared/table_loading';
import UserRow from './users/user_row';
import { fetchUsers, deleteUser } from '../actions/users';

const BREADCRUMB_ROUTES = [
  { title: 'Users' },
];
const TABLE_HEADER = ['Email', 'Role', 'Created At', '', ''];

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentDidMount() {
    const {
      setBreadcrumbItems,
      fetchUsers,
    } = this.props;

    setBreadcrumbItems(BREADCRUMB_ROUTES);
    fetchUsers();
  }

  componentWillUnmount() {
    const { setBreadcrumbItems } = this.props;
    setBreadcrumbItems([]);
  }

  handleDeleteUser(userId) {
    const answer = window.confirm('are you sure you want to delete this user?');

    if (answer) {
      const { deleteUser } = this.props;
      deleteUser(userId);
    }
  }

  renderList() {
    const { loading, list } = this.props;

    if (loading) {
      return <TableLoading colSpan={TABLE_HEADER.length} />;
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
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
