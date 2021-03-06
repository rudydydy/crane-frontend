import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './assets/css/argon.css';
import './assets/css/fontawesome.min.css';
import './assets/css/nucleo.css';
import { sessionChecker } from './actions/sessions';
import store from './store';
import DashboardLayout from './layouts/dashboard_layout';
import SignIn from './components/sign_in';
import SignUp from './components/sign_up';
import UsersList from './components/users_list';
import UsersEdit from './components/users_edit';
import ApplicationsList from './components/applications_list';
import ApplicationsNew from './components/applications_new';
import ApplicationsEdit from './components/applications_edit';
import ShellsList from './components/shells_list';
import ShellsNew from './components/shells_new';
import * as serviceWorker from './serviceWorker';

sessionChecker(store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/sign_in" />
        </Route>
        <Route
          exact
          path="/sign_in"
          component={SignIn}
        />
        <Route
          exact
          path="/sign_up"
          component={SignUp}
        />
        <Route
          exact
          path="/dashboard"
          component={DashboardLayout(() => <div />)}
        />
        <Route
          exact
          path="/dashboard/users"
          component={DashboardLayout(UsersList)}
        />
        <Route
          exact
          path="/dashboard/users/:id/edit"
          component={DashboardLayout(UsersEdit)}
        />
        <Route
          exact
          path="/dashboard/applications"
          component={DashboardLayout(ApplicationsList)}
        />
        <Route
          exact
          path="/dashboard/applications/new"
          component={DashboardLayout(ApplicationsNew)}
        />
        <Route
          exact
          path="/dashboard/applications/:id/edit"
          component={DashboardLayout(ApplicationsEdit)}
        />
        <Route
          exact
          path="/dashboard/shells"
          component={DashboardLayout(ShellsList)}
        />
        <Route
          exact
          path="/dashboard/shells/new"
          component={DashboardLayout(ShellsNew)}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
