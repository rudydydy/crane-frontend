import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
} from '../constants/users';

const initialState = {
  list: [],
  loading: false,
};

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default usersReducer;
