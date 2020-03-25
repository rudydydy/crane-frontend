import {
  FETCH_APPLICATIONS_PENDING,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATIONS_FAILED,
  FETCH_APPLICATION_PENDING,
  FETCH_APPLICATION_SUCCESS,
  FETCH_APPLICATION_FAILED,
  CREATE_APPLICATION_PENDING,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_FAILED,
  UPDATE_APPLICATION_PENDING,
  UPDATE_APPLICATION_SUCCESS,
  UPDATE_APPLICATION_FAILED,
  DELETE_APPLICATION_PENDING,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_FAILED,
} from '../constants/applications';

const initialState = {
  list: [],
  selected: null,
  loading: false,
};

const applicationsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_APPLICATIONS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_APPLICATIONS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case FETCH_APPLICATIONS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case FETCH_APPLICATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_APPLICATION_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        loading: false,
      };
    case FETCH_APPLICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case CREATE_APPLICATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_APPLICATION_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
    case CREATE_APPLICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_APPLICATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_APPLICATION_SUCCESS:
      return {
        ...state,
        list: state.list.map((APPLICATION) => {
          if (APPLICATION.id === action.payload.id) {
            return action.payload;
          } else {
            return APPLICATION;
          }
        }),
        selected: null,
        loading: false,
      };
    case UPDATE_APPLICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case DELETE_APPLICATION_PENDING:
      return {
        ...state,
        list: state.list.map((application) => {
          if (application.id === action.payload) {
            return { ...application, loading: true };
          } else {
            return application;
          }
        }),
      };
    case DELETE_APPLICATION_SUCCESS:
      return {
        ...state,
        list: state.list.filter((application) => application.id !== action.payload),
      };
    case DELETE_APPLICATION_FAILED:
      return {
        ...state,
        list: state.list.map((application) => {
          if (application.id === action.payload) {
            return { ...application, loading: false };
          } else {
            return application;
          }
        }),
      };
    default:
      return state;
  }
}

export default applicationsReducer;
