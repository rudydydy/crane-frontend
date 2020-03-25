import { combineReducers  } from 'redux';
import { reducer as formReducer  } from 'redux-form';
import sessions from './sessions';
import profiles from './profiles';
import users from './users';

const rootReducer = combineReducers({
  form: formReducer,
  sessions,
  profiles,
  users,
});

export default rootReducer;
