import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './shared/table';
import TableLoading from './shared/table_loading';
import ShellRow from './shells/shell_row';
import { fetchShells, deleteShell } from '../actions/shells';

const NEW_SHELL_LINK = '/dashboard/shells/new';
const BREADCRUMB_ROUTES = [
  { title: 'Shells' },
]

class ShellsList extends Component {
  constructor(props) {
    super(props);
    
    this.handleDeleteShell = this.handleDeleteShell.bind(this);
  }

  componentDidMount() {
    const { 
      setBreadcrumbItems, 
      setNewLink,
      fetchShells 
    } = this.props;

    setBreadcrumbItems(BREADCRUMB_ROUTES)
    setNewLink(NEW_SHELL_LINK)
    fetchShells();
  }

  componentWillUnmount() {
    const { 
      setBreadcrumbItems,
      setNewLink,
    } = this.props;
    
    setBreadcrumbItems([])
    setNewLink(null)
  }

  handleDeleteShell(shellId) {
    const answer = window.confirm("are you sure you want to delete this shell?");

    if (answer) {
      this.props.deleteShell(shellId);
    }
  }

  renderList() {
    const { loading, list } = this.props;

    if (loading) {
      return <TableLoading colSpan={8} />
    }

    return list.map((shell, index) => (
      <ShellRow 
        key={index} 
        shell={shell} 
        handleDeleteShell={this.handleDeleteShell}
      />
    ));
  }

  render() {
    return (
      <Table
        header="Shells"
        table_heads={['Application', 'Status', 'Creator', 'Activator', 'Activated At', 'Expired At', '', '']}
      >
        {this.renderList()}
      </Table>
    )
  }
}

const mapStateToProps = ({ shells: { list, loading } }) => ({ 
  list,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchShells: () => dispatch(fetchShells()),
  deleteShell: (shellId) => dispatch(deleteShell(shellId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShellsList)
