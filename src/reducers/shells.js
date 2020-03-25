import {
  FETCH_SHELLS_PENDING,
  FETCH_SHELLS_SUCCESS,
  FETCH_SHELLS_FAILED,
  FETCH_SHELL_PENDING,
  FETCH_SHELL_SUCCESS,
  FETCH_SHELL_FAILED,
  CREATE_SHELL_PENDING,
  CREATE_SHELL_SUCCESS,
  CREATE_SHELL_FAILED,
  UPDATE_SHELL_PENDING,
  UPDATE_SHELL_SUCCESS,
  UPDATE_SHELL_FAILED,
  DELETE_SHELL_PENDING,
  DELETE_SHELL_SUCCESS,
  DELETE_SHELL_FAILED,
} from '../constants/shells';

const initialState = {
  list: [],
  selected: null,
  loading: false,
};

const shellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHELLS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SHELLS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case FETCH_SHELLS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case FETCH_SHELL_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SHELL_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        loading: false,
      };
    case FETCH_SHELL_FAILED:
      return {
        ...state,
        loading: false,
      };
    case CREATE_SHELL_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SHELL_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
    case CREATE_SHELL_FAILED:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SHELL_PENDING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SHELL_SUCCESS:
      return {
        ...state,
        list: state.list.map((shell) => {
          if (shell.id === action.payload.id) {
            return action.payload;
          }
          return shell;
        }),
        selected: null,
        loading: false,
      };
    case UPDATE_SHELL_FAILED:
      return {
        ...state,
        loading: false,
      };
    case DELETE_SHELL_PENDING:
      return {
        ...state,
        list: state.list.map((shell) => {
          if (shell.id === action.payload) {
            return { ...shell, loading: true };
          }
          return shell;
        }),
      };
    case DELETE_SHELL_SUCCESS:
      return {
        ...state,
        list: state.list.filter((shell) => shell.id !== action.payload),
      };
    case DELETE_SHELL_FAILED:
      return {
        ...state,
        list: state.list.map((shell) => {
          if (shell.id === action.payload) {
            return { ...shell, loading: false };
          }
          return shell;
        }),
      };
    default:
      return state;
  }
};

export default shellsReducer;
