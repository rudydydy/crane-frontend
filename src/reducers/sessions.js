import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_OUT_SUCCESS,
  CLEAR_ERROR_MESSAGE,
} from '../constants/sessions';

const initialState = {
  authenticated: false,
  loading: false,
  message: null,
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        message: null,
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case SIGN_UP_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        mesage: null,
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default sessionsReducer;
