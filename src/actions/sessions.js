import { SubmissionError } from 'redux-form';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_OUT_SUCCESS,
  CLEAR_ERROR_MESSAGE,
  SESSION_TOKEN,
} from '../constants/sessions';
import HttpStatus from '../helpers/http_status';
import { errorFormatter } from '../helpers/formatter';

const signInUserPending = () => ({
  type: SIGN_IN_PENDING,
});

const signInUserSuccess = (payload) => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

const signInUserFailed = (payload) => ({
  type: SIGN_IN_FAILED,
  payload,
});

export const signInUser = (params) => (dispatch) => {
  const endpoint = '/api/v1/users/login';
  const body = { user: { ...params } };

  dispatch(signInUserPending());
  return axios.post(endpoint, body)
    .then((res) => res.data)
    .then((json) => {
      localStorage.setItem(SESSION_TOKEN, json.data.token);
      dispatch(signInUserSuccess(json.data));
    })
    .catch((error) => {
      const errorsRes = error.response;
      if (errorsRes.status === HttpStatus.Unauthorized) {
        dispatch(signInUserFailed(errorsRes.data.message));
      } else {
        // unknown error here
      }
    });
};

const signUpUserPending = () => ({
  type: SIGN_UP_PENDING,
});

const signUpUserSuccess = (payload) => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

const signUpUserFailed = () => ({
  type: SIGN_UP_FAILED,
});

export const signUpUser = (params) => (dispatch) => {
  const endpoint = '/api/v1/users';
  const body = { user: { ...params } };

  dispatch(signUpUserPending());
  return axios.post(endpoint, body)
    .then((res) => res.data)
    .then((json) => {
      localStorage.setItem(SESSION_TOKEN, json.data.token);
      dispatch(signUpUserSuccess(json.data));
    })
    .catch((error) => {
      const errorsRes = error.response;
      dispatch(signUpUserFailed());

      if (errorsRes.status === HttpStatus.UnprocessableEntity) {
        const errorValidation = errorsRes.data.errors;
        const serverError = errorFormatter(errorValidation);

        throw new SubmissionError(serverError);
      } else {
        // unknown error here
      }
    });
};

const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOutUser = () => (dispatch) => {
  localStorage.removeItem(SESSION_TOKEN);
  dispatch(signOutSuccess());
};

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE,
});

export const sessionChecker = (store) => {
  // here we check if seller is authenticated or determine by
  // localStorage token is empty or not
  const token = localStorage.getItem(SESSION_TOKEN);
  if (token) {
    try {
      // decode jwt token to get `exp`
      const decode = jwtDecode(token);
      const dateTime = new Date().getTime() / 1000;

      // check if token is expired or not, if conditional is true
      if (decode.exp > dateTime) {
        // token is still valid, i will automatically signed you in
        const payload = {
          email: decode.email,
          role: decode.role,
        };
        store.dispatch(signInUserSuccess(payload));
      }
    } catch (error) {
      // to catch if decoding jwt token is failed
      localStorage.removeItem(SESSION_TOKEN);
    }
  }
};
