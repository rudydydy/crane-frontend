import { SubmissionError } from 'redux-form';
import axios from 'axios';
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
import { errorResponse } from './errors';
import HttpStatus from '../helpers/http_status';
import { errorFormatter } from '../helpers/formatter';

const fetchShellsPending = () => ({
  type: FETCH_SHELLS_PENDING,
});

const fetchShellsSuccess = (payload) => ({
  type: FETCH_SHELLS_SUCCESS,
  payload,
});

const fetchShellsFailed = () => ({
  type: FETCH_SHELLS_FAILED,
});

export const fetchShells = () => (dispatch) => {
  const endpoint = '/api/v1/shells';

  dispatch(fetchShellsPending());
  return axios.get(endpoint)
    .then((res) => res.data)
    .then((json) => {
      dispatch(fetchShellsSuccess(json.data));
    })
    .catch((error) => {
      dispatch(errorResponse(error.response));
      dispatch(fetchShellsFailed());
    });
};

const fetchShellPending = () => ({
  type: FETCH_SHELL_PENDING,
});

const fetchShellSuccess = (payload) => ({
  type: FETCH_SHELL_SUCCESS,
  payload,
});

const fetchShellFailed = () => ({
  type: FETCH_SHELL_FAILED,
});

export const fetchShell = (shellId) => (dispatch, getState) => {
  const {
    shells: {
      list,
    },
  } = getState();

  const selectedShell = list.find((shell) => shell.id === parseInt(shellId, 10));

  if (selectedShell) {
    return new Promise((resolve) => {
      dispatch(fetchShellSuccess(selectedShell));
      resolve();
    });
  }

  const endpoint = `/api/v1/shells/${shellId}`;

  dispatch(fetchShellPending());
  return axios.get(endpoint)
    .then((res) => res.data)
    .then((json) => {
      dispatch(fetchShellSuccess(json.data));
    })
    .catch((error) => {
      dispatch(errorResponse(error.response));
      dispatch(fetchShellFailed());
    });
};

const createShellPending = () => ({
  type: CREATE_SHELL_PENDING,
});

const createShellSuccess = (payload) => ({
  type: CREATE_SHELL_SUCCESS,
  payload,
});

const createShellFailed = () => ({
  type: CREATE_SHELL_FAILED,
});

export const createShell = (params) => (dispatch) => {
  const endpoint = '/api/v1/shells';
  const body = { shell: { ...params } };

  dispatch(createShellPending());
  return axios.post(endpoint, body)
    .then((res) => res.data)
    .then((json) => {
      dispatch(createShellSuccess(json.data));
    })
    .catch((error) => {
      dispatch(errorResponse(error.response));
      dispatch(createShellFailed());

      if (error.response.status === HttpStatus.UnprocessableEntity) {
        const errorValidation = error.response.data.errors;
        const serverError = errorFormatter(errorValidation);

        throw new SubmissionError(serverError);
      }
    });
};

const updateShellPending = () => ({
  type: UPDATE_SHELL_PENDING,
});

const updateShellSuccess = (payload) => ({
  type: UPDATE_SHELL_SUCCESS,
  payload,
});

const updateShellFailed = () => ({
  type: UPDATE_SHELL_FAILED,
});

export const updateShell = (shellId, params) => (dispatch) => {
  const endpoint = `/api/v1/shells/${shellId}`;
  const body = { shell: { ...params } };

  dispatch(updateShellPending());
  return axios.put(endpoint, body)
    .then((res) => res.data)
    .then((json) => {
      dispatch(updateShellSuccess(json.data));
    })
    .catch((error) => {
      dispatch(errorResponse(error.response));
      dispatch(updateShellFailed());

      if (error.response.status === HttpStatus.UnprocessableEntity) {
        const errorValidation = error.response.data.errors;
        const serverError = errorFormatter(errorValidation);

        throw new SubmissionError(serverError);
      }
    });
};

const deleteShellPending = (payload) => ({
  type: DELETE_SHELL_PENDING,
  payload,
});

const deleteShellSuccess = (payload) => ({
  type: DELETE_SHELL_SUCCESS,
  payload,
});

const deleteShellFailed = (payload) => ({
  type: DELETE_SHELL_FAILED,
  payload,
});

export const deleteShell = (shellId) => (dispatch) => {
  const endpoint = `/api/v1/shells/${shellId}`;

  dispatch(deleteShellPending(shellId));
  return axios.delete(endpoint)
    .then(() => {
      dispatch(deleteShellSuccess(shellId));
    })
    .catch((error) => {
      dispatch(errorResponse(error.response));
      dispatch(deleteShellFailed(shellId));
    });
};
