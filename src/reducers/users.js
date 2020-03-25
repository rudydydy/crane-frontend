import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from '../constants/users';

const initialState = {
  list: [],
  selected: null,
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
    case FETCH_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        loading: false,
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        list: state.list.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          } else {
            return user;
          }
        }),
        selected: null,
        loading: false,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_PENDING:
      return {
        ...state,
        list: state.list.map((user) => {
          if (user.id === action.payload) {
            return { ...user, loading: true };
          } else {
            return user;
          }
        }),
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        list: state.list.filter((user) => user.id !== action.payload),
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        list: state.list.map((user) => {
          if (user.id === action.payload) {
            return { ...user, loading: false };
          } else {
            return user;
          }
        }),
      };
    default:
      return state;
  }
}

export default usersReducer;
