import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './shared/table';
import TableLoading from './shared/table_loading';
import ApplicationRow from './applications/application_row';
import { fetchApplications, deleteApplication } from '../actions/applications';

const NEW_APPLICATION_LINK = '/dashboard/applications/new';
const BREADCRUMB_ROUTES = [
  { title: 'Applications' },
]
const TABLE_HEADER = ['Name', 'Command', 'Created At', '', '']

class ApplicationsList extends Component {
  constructor(props) {
    super(props);
    
    this.handleDeleteApplication = this.handleDeleteApplication.bind(this);
  }

  componentDidMount() {
    const { 
      setBreadcrumbItems, 
      setNewLink,
      fetchApplications 
    } = this.props;

    setBreadcrumbItems(BREADCRUMB_ROUTES)
    setNewLink(NEW_APPLICATION_LINK)
    fetchApplications();
  }

  componentWillUnmount() {
    const { 
      setBreadcrumbItems,
      setNewLink,
    } = this.props;
    
    setBreadcrumbItems([])
    setNewLink(null)
  }

  handleDeleteApplication(applicationId) {
    const answer = window.confirm("are you sure you want to delete this application?");

    if (answer) {
      this.props.deleteApplication(applicationId);
    }
  }

  renderList() {
    const { loading, list } = this.props;

    if (loading) {
      return <TableLoading colSpan={TABLE_HEADER.length} />
    }

    return list.map((application, index) => (
      <ApplicationRow 
        key={index} 
        application={application} 
        handleDeleteApplication={this.handleDeleteApplication}
      />
    ));
  }

  render() {
    return (
      <Table
        header="Applications"
        table_heads={TABLE_HEADER}
      >
        {this.renderList()}
      </Table>
    )
  }
}

const mapStateToProps = ({ applications: { list, loading } }) => ({ 
  list,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApplications: () => dispatch(fetchApplications()),
  deleteApplication: (applicationId) => dispatch(deleteApplication(applicationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsList)
