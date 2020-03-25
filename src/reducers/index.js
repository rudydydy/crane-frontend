import { combineReducers  } from 'redux';
import { reducer as formReducer  } from 'redux-form';
import breadcrumbs from './breadcrumbs';
import sessions from './sessions';
import profiles from './profiles';
import users from './users';

const rootReducer = combineReducers({
  form: formReducer,
  breadcrumbs,
  sessions,
  profiles,
  users,
});

export default rootReducer;
