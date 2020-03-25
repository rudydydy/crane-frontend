import { ERROR_RESPONSE } from '../constants/errors';
import {
  SIGN_OUT_SUCCESS,
  SESSION_TOKEN,
} from '../constants/sessions';
import HttpStatus from '../helpers/http_status';

const authCheckerMiddleware = (store) => (next) => (action) => {
  if (action.type === ERROR_RESPONSE && action.payload.status === HttpStatus.Unauthorized) {
    localStorage.removeItem(SESSION_TOKEN);
    store.dispatch({ type: SIGN_OUT_SUCCESS });
  }

  return next(action);
};

export default authCheckerMiddleware;
