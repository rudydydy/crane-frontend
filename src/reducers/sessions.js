import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED
} from '../constants/sessions';

const initialState = {
  authenticated: false,
  loading: false,
  message: null,
};

const sessionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGN_IN_PENDING:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default sessionsReducer;
