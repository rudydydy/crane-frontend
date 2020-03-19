import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './assets/css/argon.css';
import './assets/css/fontawesome.min.css';
import './assets/css/nucleo.css';
import './assets/css/style.css';
import store from './store';
import SignIn from './components/sign_in';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact={true} path="/">
				  <Redirect to="/sign_in" />
				</Route>
				<Route
					exact={true}
					path="/sign_in"
					component={SignIn}
				/>
			</Switch>
		</Router> 
	</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
