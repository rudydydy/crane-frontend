import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_OUT_SUCCESS,
} from '../constants/sessions';

const initialState = {
  email: '',
  role: 'activator',
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        role: action.payload.role,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        role: action.payload.role,
      };
    case SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default profilesReducer;
