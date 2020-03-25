import { combineReducers  } from 'redux';
import { reducer as formReducer  } from 'redux-form';
import breadcrumbs from './breadcrumbs';
import sessions from './sessions';
import profiles from './profiles';
import users from './users';
import applications from './applications';

const rootReducer = combineReducers({
  form: formReducer,
  breadcrumbs,
  sessions,
  profiles,
  users,
  applications,
});

export default rootReducer;
