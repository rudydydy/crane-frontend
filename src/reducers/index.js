import { combineReducers  } from 'redux';
import { reducer as formReducer  } from 'redux-form';
import sessions from './sessions';
import profiles from './profiles';

const rootReducer = combineReducers({
  form: formReducer,
  sessions,
  profiles,
});

export default rootReducer;
